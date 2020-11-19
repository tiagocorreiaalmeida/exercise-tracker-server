export interface ActivityLog {
  id: string;
  activityId: string;
  quantity: number; //Depending on the type it can be represented as a number of repetions or seconds
  createdAt: Date;
  updatedAt: Date;
}
