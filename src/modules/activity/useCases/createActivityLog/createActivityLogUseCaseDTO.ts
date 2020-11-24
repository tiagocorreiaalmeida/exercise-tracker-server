import { ActivityLog } from '../../domain/activityLog';

export interface CreateActivityLogDTO {
  userId: string;
  activityId: string;
  quantity: number;
  practicedAt: Date;
}

export type CreateActivityLogDTOResponse = ActivityLog;
