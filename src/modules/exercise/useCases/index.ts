import { UserRepo } from '../../user/domain/repos/userRepo';
import { ExerciseLogRepo } from '../domain/repos/exerciseLogRepo';
import { ExerciseRepo } from '../domain/repos/exerciseRepo';
import { CategoryRepo } from '../domain/repos/categoryRepo';
import { CreateExerciseUseCase } from './createExercise/createExerciseUseCase';
import { CreateExerciseLogUseCase } from './createExerciseLog/createExerciseLogUseCase';
import { CreateCategoryUseCase } from './createCategory/createCategoryUseCase';

interface ExerciseUseCasesDependencies {
  exerciseRepo: ExerciseRepo;
  exerciseLogRepo: ExerciseLogRepo;
  categoryRepo: CategoryRepo;
  userRepo: UserRepo;
}

export type ExerciseUseCases = (
  dependencies: ExerciseUseCasesDependencies,
) => {
  createExercise: CreateExerciseUseCase;
  createExerciseLog: CreateExerciseLogUseCase;
  createCategory: CreateCategoryUseCase;
};

export const exerciseUseCases: ExerciseUseCases = ({
  exerciseLogRepo,
  exerciseRepo,
  userRepo,
  categoryRepo,
}) => ({
  createExercise: new CreateExerciseUseCase(exerciseRepo, userRepo),
  createExerciseLog: new CreateExerciseLogUseCase(exerciseLogRepo, exerciseRepo),
  createCategory: new CreateCategoryUseCase(categoryRepo, userRepo),
});
