import { CreateExerciseLogUseCase } from '../createExerciseLogUseCase';
import { InMemoryExerciseRepo } from '../../../infra/repos/tests/inMemoryExerciseRepo';
import { EXERCISE_NOT_FOUND } from '../createExerciseLogErrors';
import { CreateExerciseLogDTO } from '../createExerciseLogUseCaseDTO';
import { UniqueEntityID } from '../../../../../shared/core/UniqueEntityID';
import { InMemoryExerciseLogRepo } from '../../../infra/repos/tests/inMemoryExerciseLogRepo';
import { generateExerciseCreateData } from '../../../../../shared/utils/tests/exercise';
import { invalidRangeError } from '../../../../../shared/logic/ErrorMessages';
import { MIN_QUANTITY } from '../createExerciseLogValidator';
import { ValidationError } from '../../../../../shared/core/Errors';

const quantityError = invalidRangeError('quantity', {
  min: MIN_QUANTITY,
});

describe('CreateExerciseLog', () => {
  const exerciseRepo = new InMemoryExerciseRepo();
  const exerciseLogRepo = new InMemoryExerciseLogRepo();
  const exercise = generateExerciseCreateData();
  const otherUserExercise = generateExerciseCreateData();
  const createExerciseLogUseCase = new CreateExerciseLogUseCase(exerciseLogRepo, exerciseRepo);

  const validDto: CreateExerciseLogDTO = {
    userId: exercise.ownerId,
    quantity: 10,
    exerciseId: exercise.id,
    practicedAt: new Date(),
  };

  beforeAll(async () => {
    await exerciseRepo.save(exercise);
    await exerciseRepo.save(otherUserExercise);
  });

  it('Should reject a quantity lower than 1', async () => {
    const result = await createExerciseLogUseCase.execute({
      ...validDto,
      quantity: MIN_QUANTITY - 1,
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(
      new ValidationError(quantityError.message, quantityError.field),
    );
  });

  it('should refuse a non existent exercise', async () => {
    const result = await createExerciseLogUseCase.execute({
      ...validDto,
      exerciseId: new UniqueEntityID().toString(),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(EXERCISE_NOT_FOUND);
  });

  it('should refuse an exerciseLog to an exercise that does not belong to the user', async () => {
    const result = await createExerciseLogUseCase.execute({
      ...validDto,
      exerciseId: otherUserExercise.id,
    });
    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(EXERCISE_NOT_FOUND);
  });

  it('should create,persist and return a valid CreateExerciseLogDTOResponse', async () => {
    const result = await createExerciseLogUseCase.execute(validDto);
    expect(result.isError).toBeFalsy();

    const response = result.getValue();

    expect(response.quantity).toEqual(validDto.quantity);
    1;
    expect(response.exerciseId).toEqual(validDto.exerciseId);
    expect(response.id).toBeDefined();

    const exerciseExists = await exerciseLogRepo.exists(response.id);
    expect(exerciseExists).toBeTruthy();
  });
});
