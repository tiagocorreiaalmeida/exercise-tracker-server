import {
  ActivityLogRepo as IActivityLogRepo,
  CreateActivityLogProps,
} from '../../../domain/repos/activityLogRepo';
import { ActivityLog } from '../../../domain/activityLog';

export class InMemoryActivityLogRepo implements IActivityLogRepo {
  activitiesLog: ActivityLog[];

  constructor() {
    this.activitiesLog = [];
  }

  async save(partialActivityLog: CreateActivityLogProps): Promise<ActivityLog> {
    const activityLog = {
      ...partialActivityLog,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.activitiesLog.push(activityLog);
    return activityLog;
  }

  async exists(activityLogId: string): Promise<boolean> {
    const activityLog = this.activitiesLog.find(
      (storedActivityLog) => storedActivityLog.id === activityLogId,
    );

    return !!activityLog;
  }
}

export const ActivityLogRepo = new InMemoryActivityLogRepo();
