import {
  ActivityRepo as IActivityRepo,
  CreateActivityProps,
} from '../../../domain/repos/activityRepo';
import { Activity } from '../../../domain/activity';

export class InMemoryActivityRepo implements IActivityRepo {
  activities: Activity[];

  constructor() {
    this.activities = [];
  }

  async save(partialActivity: CreateActivityProps): Promise<Activity> {
    const activity = {
      ...partialActivity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.activities.push(activity);
    return activity;
  }

  async findByNameAndOwner(activityName: string, ownerId: string): Promise<Activity | null> {
    const activity = this.activities.find(
      (storedActivity) =>
        storedActivity.name === activityName && storedActivity.ownerId === ownerId,
    );

    return activity || null;
  }

  async exists(activityId: string): Promise<boolean> {
    const activity = this.activities.find((storedActivity) => storedActivity.id === activityId);

    return !!activity;
  }
}

export const ActivityRepo = new InMemoryActivityRepo();
