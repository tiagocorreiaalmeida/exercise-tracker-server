import { UseCase } from '../../../../shared/core/useCase';
import { CreateExerciseDTO, CreateExerciseDTOResponse } from './createExerciseUseCaseDTO';
import { Result } from '../../../../shared/core/Result';
import { ExerciseRepo } from '../../domain/repos/exerciseRepo';
import { UserRepo } from '../../../user/domain/repos/userRepo';
import { validateExerciseCreate } from './createExerciseValidator';
import { DUPLICATED_EXERCISE_NAME, USER_NOT_FOUND } from './createExerciseErrors';
import { UniqueEntityID } from '../../../../shared/core/UniqueEntityID';

export class CreateExerciseUseCase
  implements UseCase<CreateExerciseDTO, Result<CreateExerciseDTOResponse>> {
  constructor(private exerciseRepo: ExerciseRepo, private userRepo: UserRepo) {}
  async execute(dto: CreateExerciseDTO): Promise<Result<CreateExerciseDTOResponse>> {
    const validation = validateExerciseCreate(dto);

    if (validation.isError) {
      return Result.fail<CreateExerciseDTOResponse>(validation.getError());
    }

    const userExists = await this.userRepo.exists(dto.ownerId);
    if (!userExists) {
      return Result.fail<CreateExerciseDTOResponse>(USER_NOT_FOUND);
    }

    const exerciseExists = await this.exerciseRepo.findByNameAndOwner(dto.name, dto.ownerId);
    if (exerciseExists) {
      return Result.fail<CreateExerciseDTOResponse>(DUPLICATED_EXERCISE_NAME);
    }

    const exercise = await this.exerciseRepo.save({
      ...dto,
      id: new UniqueEntityID().toString(),
    });

    return Result.success<CreateExerciseDTOResponse>(exercise);
  }
}
