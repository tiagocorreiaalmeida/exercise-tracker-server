import { Activity } from '../activity';

export type CreateActivityArgs = Omit<Activity, 'createdAt' | 'updatedAt'>;

export interface ActivityRepo {
  exists(activityId: string): Promise<boolean>;
  save(activity: CreateActivityArgs): Promise<Activity>;
  findByNameAndOwner(activityName: string, ownerId: string): Promise<Activity | null>;
}
