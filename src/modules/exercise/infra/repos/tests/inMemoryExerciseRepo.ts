import {
  ExerciseRepo as IExerciseRepo,
  CreateExerciseArgs,
} from '../../../domain/repos/exerciseRepo';
import { Exercise } from '../../../domain/exercise';

export class InMemoryExerciseRepo implements IExerciseRepo {
  exercises: Exercise[];

  constructor() {
    this.exercises = [];
  }

  async save(partialExercise: CreateExerciseArgs): Promise<Exercise> {
    const exercise = {
      ...partialExercise,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.exercises.push(exercise);
    return exercise;
  }

  async findByNameAndOwner(exerciseName: string, ownerId: string): Promise<Exercise | null> {
    const exercise = this.exercises.find(
      (storedExercise) =>
        storedExercise.name === exerciseName && storedExercise.ownerId === ownerId,
    );

    return exercise || null;
  }

  async exists(exerciseId: string): Promise<boolean> {
    const exercise = this.exercises.find((storedExercise) => storedExercise.id === exerciseId);

    return !!exercise;
  }

  async findByIdAndOwner(exerciseId: string, ownerId: string): Promise<Exercise | null> {
    const exercise = this.exercises.find(
      (storedExercise) => storedExercise.id === exerciseId && storedExercise.ownerId === ownerId,
    );

    return exercise || null;
  }
}

export const ExerciseRepo = new InMemoryExerciseRepo();
