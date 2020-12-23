import { TrackType, Exercise } from '../../domain/exercise';

export interface CreateExerciseDTO {
  ownerId: string;
  trackType: TrackType;
  name: string;
}

export type CreateExerciseDTOResponse = Exercise;
