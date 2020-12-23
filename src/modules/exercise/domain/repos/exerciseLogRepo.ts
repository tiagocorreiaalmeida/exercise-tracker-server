import { ExerciseLog } from '../exerciseLog';

export type CreateExerciseLogProps = Omit<ExerciseLog, 'createdAt' | 'updatedAt'>;

export interface ExerciseLogRepo {
  exists(exerciseLogId: string): Promise<boolean>;
  save(exerciseLog: CreateExerciseLogProps): Promise<ExerciseLog>;
}
