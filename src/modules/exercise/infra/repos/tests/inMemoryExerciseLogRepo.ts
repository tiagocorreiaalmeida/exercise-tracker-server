import {
  ExerciseLogRepo as IExerciseLogRepo,
  CreateExerciseLogProps,
} from '../../../domain/repos/exerciseLogRepo';
import { ExerciseLog } from '../../../domain/exerciseLog';

export class InMemoryExerciseLogRepo implements IExerciseLogRepo {
  exercisesLog: ExerciseLog[];

  constructor() {
    this.exercisesLog = [];
  }

  async save(partialExerciseLog: CreateExerciseLogProps): Promise<ExerciseLog> {
    const exerciseLog = {
      ...partialExerciseLog,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.exercisesLog.push(exerciseLog);
    return exerciseLog;
  }

  async exists(exerciseLogId: string): Promise<boolean> {
    const exerciseLog = this.exercisesLog.find(
      (storedExerciseLog) => storedExerciseLog.id === exerciseLogId,
    );

    return !!exerciseLog;
  }
}

export const ExerciseLogRepo = new InMemoryExerciseLogRepo();
