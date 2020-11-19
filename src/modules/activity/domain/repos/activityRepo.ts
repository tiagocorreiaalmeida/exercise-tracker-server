import { Activity } from '../activity';

export type CreateActivityProps = Omit<Activity, 'createdAt' | 'updatedAt'>;

export interface ActivityRepo {
  exists(activityId: string): Promise<boolean>;
  save(activity: CreateActivityProps): Promise<Activity>;
  findByNameAndOwner(activityName: string, ownerId: string): Promise<Activity | null>;
}
