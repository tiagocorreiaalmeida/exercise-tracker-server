import { ExerciseLog } from '../../domain/exerciseLog';

export interface CreateExerciseLogDTO {
  userId: string;
  exerciseId: string;
  quantity: number;
  practicedAt: Date;
}

export type CreateExerciseLogDTOResponse = ExerciseLog;
