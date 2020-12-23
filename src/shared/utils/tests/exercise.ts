import { TrackType } from '../../../modules/exercise/domain/exercise';

import { CreateExerciseArgs } from '../../../modules/exercise/domain/repos/exerciseRepo';
import { MIN_NAME_LENGTH } from '../../../modules/exercise/useCases/createExercise/createExerciseValidator';
import { UniqueEntityID } from '../../core/UniqueEntityID';

export const generateExerciseCreateData = (
  ownerId: string = new UniqueEntityID().toString(),
  trackType: TrackType = TrackType.QUANTITY,
): CreateExerciseArgs => {
  const name = 'a'.repeat(MIN_NAME_LENGTH);

  return {
    id: new UniqueEntityID().toString(),
    name,
    trackType,
    ownerId,
  };
};
