import { TrackType } from '../../../modules/activity/domain/activity';

import { CreateActivityArgs } from '../../../modules/activity/domain/repos/activityRepo';
import { MIN_NAME_LENGTH } from '../../../modules/activity/useCases/createActivity/createActivityValidator';
import { UniqueEntityID } from '../../core/UniqueEntityID';

export const generateActivityCreateData = (
  ownerId: string = new UniqueEntityID().toString(),
  trackType: TrackType = TrackType.QUANTITY,
): CreateActivityArgs => {
  const name = 'a'.repeat(MIN_NAME_LENGTH);

  return {
    id: new UniqueEntityID().toString(),
    name,
    trackType,
    ownerId,
  };
};
