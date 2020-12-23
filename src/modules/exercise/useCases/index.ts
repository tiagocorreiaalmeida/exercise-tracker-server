import { UserRepo } from '../../user/domain/repos/userRepo';
import { ExerciseLogRepo } from '../domain/repos/exerciseLogRepo';
import { ExerciseRepo } from '../domain/repos/exerciseRepo';
import { CreateExerciseUseCase } from './createExercise/createExerciseUseCase';
import { CreateExerciseLogUseCase } from './createExerciseLog/createExerciseLogUseCase';

interface ExerciseUseCasesDependencies {
  exerciseRepo: ExerciseRepo;
  exerciseLogRepo: ExerciseLogRepo;
  userRepo: UserRepo;
}

export type ExerciseUseCases = (
  dependencies: ExerciseUseCasesDependencies,
) => {
  createExercise: CreateExerciseUseCase;
  createExerciseLog: CreateExerciseLogUseCase;
};

export const exerciseUseCases: ExerciseUseCases = ({
  exerciseLogRepo,
  exerciseRepo,
  userRepo,
}) => ({
  createExercise: new CreateExerciseUseCase(exerciseRepo, userRepo),
  createExerciseLog: new CreateExerciseLogUseCase(exerciseLogRepo, exerciseRepo),
});
