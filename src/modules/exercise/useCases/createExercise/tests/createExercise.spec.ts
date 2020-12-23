import { CreateExerciseUseCase } from '../createExerciseUseCase';
import { InMemoryExerciseRepo } from '../../../infra/repos/tests/inMemoryExerciseRepo';
import { InMemoryUserRepo } from '../../../../user/infra/repos/tests/inMemoryUserRepo';
import {
  DUPLICATED_EXERCISE_NAME,
  USER_NOT_FOUND,
  PERMISSION_DENIED,
} from '../createExerciseErrors';
import { generateUserCreateData } from '../../../../../shared/utils/tests/user';
import { generateExerciseCreateData } from '../../../../../shared/utils/tests/exercise';
import { CreateExerciseDTO } from '../createExerciseUseCaseDTO';
import { TrackType } from '../../../domain/exercise';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from '../createExerciseValidator';
import { invalidLengthError } from '../../../../../shared/logic/ErrorMessages';
import { ValidationError } from '../../../../../shared/core/Errors';
import { UniqueEntityID } from '../../../../../shared/core/UniqueEntityID';

const nameError = invalidLengthError('name', {
  min: MIN_NAME_LENGTH,
  max: MAX_NAME_LENGTH,
});

describe('CreateExercise', () => {
  const userRepo = new InMemoryUserRepo();
  const exerciseRepo = new InMemoryExerciseRepo();
  const user = generateUserCreateData();
  const admin = generateUserCreateData(true);
  const createExerciseUseCase = new CreateExerciseUseCase(exerciseRepo, userRepo);

  const validDto = generateExerciseCreateData(user.id, TrackType.QUANTITY);

  const adminDto = generateExerciseCreateData(admin.id, TrackType.QUANTITY, true);

  beforeAll(async () => {
    await userRepo.save(user);
    await userRepo.save(admin);
  });

  it('Should reject a smaller name than the required', async () => {
    const result = await createExerciseUseCase.execute({
      ...validDto,
      name: 'a'.repeat(MIN_NAME_LENGTH - 1),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(
      new ValidationError(nameError.message, nameError.field),
    );
  });

  it('Should reject a bigger name than the allowed', async () => {
    const result = await createExerciseUseCase.execute({
      ...validDto,
      name: 'a'.repeat(MAX_NAME_LENGTH + 1),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(
      new ValidationError(nameError.message, nameError.field),
    );
  });

  it('should refuse a non existent user', async () => {
    const result = await createExerciseUseCase.execute({
      ...validDto,
      ownerId: new UniqueEntityID().toString(),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(USER_NOT_FOUND);
  });

  it('should create,persist and return a valid CreateExerciseDTOResponse', async () => {
    const result = await createExerciseUseCase.execute(validDto);
    expect(result.isError).toBeFalsy();

    const response = result.getValue();
    expect(response.name).toEqual(validDto.name);
    expect(response.trackType).toEqual(validDto.trackType);
    expect(response.ownerId).toEqual(validDto.ownerId);
    expect(response.id).toBeDefined();

    const exerciseExists = await exerciseRepo.exists(response.id);
    expect(exerciseExists).toBeTruthy();
  });

  it('should refuse a duplicated exercise name per user', async () => {
    const result = await createExerciseUseCase.execute(validDto);

    expect(result.isError).toBeTruthy();
    expect(result.getError()).toStrictEqual(DUPLICATED_EXERCISE_NAME);
  });

  it('should refuse to create a globally shared exercise if user has no admin privilege', async () => {
    const result = await createExerciseUseCase.execute({
      ...adminDto,
      ownerId: user.id,
    });

    expect(result.isError).toBeTruthy();
    expect(result.getError()).toStrictEqual(PERMISSION_DENIED);
  });

  it('should create a globally shared exercise if user has admin privilege', async () => {
    const result = await createExerciseUseCase.execute(adminDto);
    expect(result.isError).toBeFalsy();

    const response = result.getValue();
    expect(response.name).toEqual(adminDto.name);
    expect(response.trackType).toEqual(adminDto.trackType);
    expect(response.ownerId).toEqual(adminDto.ownerId);
    expect(response.isShared).toBeTruthy();
    expect(response.id).toBeDefined();

    const exerciseExists = await exerciseRepo.exists(response.id);
    expect(exerciseExists).toBeTruthy();
  });
});
