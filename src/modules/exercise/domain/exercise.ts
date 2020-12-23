export enum TrackType {
  TIME = 'TIME',
  QUANTITY = 'QUANTITY',
}

export interface Exercise {
  id: string;
  ownerId: string;
  isShared: boolean; //defines if all users have access to this exercise, this exercises are created by the admin
  trackType: TrackType;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
