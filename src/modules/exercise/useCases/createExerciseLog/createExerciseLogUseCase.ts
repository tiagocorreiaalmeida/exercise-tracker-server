import { UseCase } from '../../../../shared/core/useCase';
import { CreateExerciseLogDTO, CreateExerciseLogDTOResponse } from './createExerciseLogUseCaseDTO';
import { Result } from '../../../../shared/core/Result';
import { ExerciseRepo } from '../../domain/repos/exerciseRepo';
import { validateExerciseCreate } from './createExerciseLogValidator';
import { EXERCISE_NOT_FOUND } from './createExerciseLogErrors';
import { UniqueEntityID } from '../../../../shared/core/UniqueEntityID';
import { ExerciseLogRepo } from '../../domain/repos/exerciseLogRepo';

export class CreateExerciseLogUseCase
  implements UseCase<CreateExerciseLogDTO, Result<CreateExerciseLogDTOResponse>> {
  constructor(private exerciseLogRepo: ExerciseLogRepo, private exerciseRepo: ExerciseRepo) {}
  async execute(dto: CreateExerciseLogDTO): Promise<Result<CreateExerciseLogDTOResponse>> {
    const validation = validateExerciseCreate(dto);

    if (validation.isError) {
      return Result.fail<CreateExerciseLogDTOResponse>(validation.getError());
    }

    const exerciseExists = await this.exerciseRepo.findByIdAndOwner(dto.exerciseId, dto.userId);
    if (!exerciseExists) {
      return Result.fail<CreateExerciseLogDTOResponse>(EXERCISE_NOT_FOUND);
    }

    const exerciseLog = await this.exerciseLogRepo.save({
      ...dto,
      id: new UniqueEntityID().toString(),
    });

    return Result.success<CreateExerciseLogDTOResponse>(exerciseLog);
  }
}
