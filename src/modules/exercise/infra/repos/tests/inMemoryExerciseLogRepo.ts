import {
  ExerciseLogRepo as IExerciseLogRepo,
  CreateExerciseLogProps,
} from '../../../domain/repos/exerciseLogRepo';
import { ExerciseLog } from '../../../domain/exerciseLog';

export class InMemoryExerciseLogRepo implements IExerciseLogRepo {
  activitiesLog: ExerciseLog[];

  constructor() {
    this.activitiesLog = [];
  }

  async save(partialExerciseLog: CreateExerciseLogProps): Promise<ExerciseLog> {
    const exerciseLog = {
      ...partialExerciseLog,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.activitiesLog.push(exerciseLog);
    return exerciseLog;
  }

  async exists(exerciseLogId: string): Promise<boolean> {
    const exerciseLog = this.activitiesLog.find(
      (storedExerciseLog) => storedExerciseLog.id === exerciseLogId,
    );

    return !!exerciseLog;
  }
}

export const ExerciseLogRepo = new InMemoryExerciseLogRepo();
