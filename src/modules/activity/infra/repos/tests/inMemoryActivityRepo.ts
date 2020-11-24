import {
  ActivityRepo as IActivityRepo,
  CreateActivityArgs,
} from '../../../domain/repos/activityRepo';
import { Activity } from '../../../domain/activity';

export class InMemoryActivityRepo implements IActivityRepo {
  activities: Activity[];

  constructor() {
    this.activities = [];
  }

  async save(partialActivity: CreateActivityArgs): Promise<Activity> {
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

  async findByIdAndOwner(activityId: string, ownerId: string): Promise<Activity | null> {
    const activity = this.activities.find(
      (storedActivity) => storedActivity.id === activityId && storedActivity.ownerId === ownerId,
    );

    return activity || null;
  }
}

export const ActivityRepo = new InMemoryActivityRepo();
