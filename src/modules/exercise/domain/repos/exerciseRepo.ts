import { Exercise } from '../exercise';

export type CreateExerciseArgs = Omit<Exercise, 'createdAt' | 'updatedAt'>;

export interface ExerciseRepo {
  exists(exerciseId: string): Promise<boolean>;
  save(exercise: CreateExerciseArgs): Promise<Exercise>;
  findByNameAndOwner(exerciseName: string, ownerId: string): Promise<Exercise | null>;
  findByIdAndOwner(exerciseId: string, ownerId: string): Promise<Exercise | null>;
}
