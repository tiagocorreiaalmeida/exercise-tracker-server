import { CreateActivityLogUseCase } from '../createActivityLogUseCase';
import { InMemoryActivityRepo } from '../../../infra/repos/tests/inMemoryActivityRepo';
import { ACTIVITY_NOT_FOUND } from '../createActivityLogErrors';
import { CreateActivityLogDTO } from '../createActivityLogUseCaseDTO';
import { UniqueEntityID } from '../../../../../shared/core/UniqueEntityID';
import { InMemoryActivityLogRepo } from '../../../infra/repos/tests/inMemoryActivityLogRepo';
import { generateActivityCreateData } from '../../../../../shared/utils/tests/activity';
import { invalidRangeError } from '../../../../../shared/logic/ErrorMessages';
import { MIN_QUANTITY } from '../createActivityLogValidator';
import { ValidationError } from '../../../../../shared/core/Errors';

const quantityError = invalidRangeError('quantity', {
  min: MIN_QUANTITY,
});

describe('CreateActivityLog', () => {
  const activityRepo = new InMemoryActivityRepo();
  const activityLogRepo = new InMemoryActivityLogRepo();
  const activity = generateActivityCreateData();
  const otherUserActivity = generateActivityCreateData();
  const createActivityLogUseCase = new CreateActivityLogUseCase(activityLogRepo, activityRepo);

  const validDto: CreateActivityLogDTO = {
    userId: activity.ownerId,
    quantity: 10,
    activityId: activity.id,
    practicedAt: new Date(),
  };

  beforeAll(async () => {
    await activityRepo.save(activity);
    await activityRepo.save(otherUserActivity);
  });

  it('Should reject a quantity lower than 1', async () => {
    const result = await createActivityLogUseCase.execute({
      ...validDto,
      quantity: MIN_QUANTITY - 1,
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(
      new ValidationError(quantityError.message, quantityError.field),
    );
  });

  it('should refuse a non existent activity', async () => {
    const result = await createActivityLogUseCase.execute({
      ...validDto,
      activityId: new UniqueEntityID().toString(),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(ACTIVITY_NOT_FOUND);
  });

  it('should refuse an activityLog to an activity that does not belong to the user', async () => {
    const result = await createActivityLogUseCase.execute({
      ...validDto,
      activityId: otherUserActivity.id,
    });
    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(ACTIVITY_NOT_FOUND);
  });

  it('should create,persist and return a valid CreateActivityLogDTOResponse', async () => {
    const result = await createActivityLogUseCase.execute(validDto);
    expect(result.isError).toBeFalsy();

    const response = result.getValue();

    expect(response.quantity).toEqual(validDto.quantity);
    1;
    expect(response.activityId).toEqual(validDto.activityId);
    expect(response.id).toBeDefined();

    const activityExists = await activityLogRepo.exists(response.id);
    expect(activityExists).toBeTruthy();
  });
});
