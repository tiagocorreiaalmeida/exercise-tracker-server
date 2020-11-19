import { TrackType, Activity } from '../../domain/activity';

export interface CreateActivityDTO {
  ownerId: string;
  trackType: TrackType;
  name: string;
}

export type CreateActivityDTOResponse = Activity;
