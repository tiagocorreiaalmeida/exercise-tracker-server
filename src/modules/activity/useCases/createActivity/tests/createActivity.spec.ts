import { CreateActivityUseCase } from '../createActivityUseCase';
import { InMemoryActivityRepo } from '../../../infra/repos/tests/inMemoryActivityRepo';
import { InMemoryUserRepo } from '../../../../user/infra/repos/tests/inMemoryUserRepo';
import { DUPLICATED_ACTIVITY_NAME, USER_NOT_FOUND } from '../createActivityErrors';
import { generateUserCreateData } from '../../../../../shared/utils/tests/user';
import { CreateActivityDTO } from '../createActivityUseCaseDTO';
import { TrackType } from '../../../domain/activity';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from '../createActivityValidator';
import { invalidLengthError } from '../../../../../shared/logic/ErrorMessages';
import { ValidationError } from '../../../../../shared/core/Errors';
import { UniqueEntityID } from '../../../../../shared/core/UniqueEntityID';

const nameError = invalidLengthError('name', {
  min: MIN_NAME_LENGTH,
  max: MAX_NAME_LENGTH,
});

describe('CreateActivity', () => {
  const userRepo = new InMemoryUserRepo();
  const activityRepo = new InMemoryActivityRepo();
  const user = generateUserCreateData();
  const createActivityUseCase = new CreateActivityUseCase(activityRepo, userRepo);

  const validDto: CreateActivityDTO = {
    name: 'a'.repeat(MIN_NAME_LENGTH),
    trackType: TrackType.QUANTITY,
    ownerId: user.id,
  };

  beforeAll(async () => {
    await userRepo.save(user);
  });

  it('Should reject a smaller name than the required', async () => {
    const result = await createActivityUseCase.execute({
      ...validDto,
      name: 'a'.repeat(MIN_NAME_LENGTH - 1),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(
      new ValidationError(nameError.message, nameError.field),
    );
  });

  it('Should reject a bigger name than the allowed', async () => {
    const result = await createActivityUseCase.execute({
      ...validDto,
      name: 'a'.repeat(MAX_NAME_LENGTH + 1),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(
      new ValidationError(nameError.message, nameError.field),
    );
  });

  it('should refuse a non existent user', async () => {
    const result = await createActivityUseCase.execute({
      ...validDto,
      ownerId: new UniqueEntityID().toString(),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(USER_NOT_FOUND);
  });

  it('should create,persist and return a valid CreateActivityDTOResponse', async () => {
    const result = await createActivityUseCase.execute(validDto);
    expect(result.isError).toBeFalsy();

    const response = result.getValue();
    expect(response.name).toEqual(validDto.name);
    expect(response.trackType).toEqual(validDto.trackType);
    expect(response.ownerId).toEqual(validDto.ownerId);
    expect(response.id).toBeDefined();

    const activityExists = await activityRepo.exists(response.id);
    expect(activityExists).toBeTruthy();
  });

  it('should refuse a duplicated activity name per user', async () => {
    const result = await createActivityUseCase.execute(validDto);

    expect(result.isError).toBeTruthy();
    expect(result.getError()).toStrictEqual(DUPLICATED_ACTIVITY_NAME);
  });
});
