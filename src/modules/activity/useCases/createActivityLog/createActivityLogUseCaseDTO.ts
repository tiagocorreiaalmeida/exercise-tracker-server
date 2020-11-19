import { ActivityLog } from '../../domain/activityLog';

export interface CreateActivityLogDTO {
  activityId: string;
  quantity: number;
}

export type CreateActivityLogDTOResponse = ActivityLog;
