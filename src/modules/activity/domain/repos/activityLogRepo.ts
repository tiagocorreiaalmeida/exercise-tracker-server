import { ActivityLog } from '../activityLog';

export type CreateActivityLogProps = Omit<ActivityLog, 'createdAt' | 'updatedAt'>;

export interface ActivityLogRepo {
  exists(activityLogId: string): Promise<boolean>;
  save(activityLog: CreateActivityLogProps): Promise<ActivityLog>;
}
