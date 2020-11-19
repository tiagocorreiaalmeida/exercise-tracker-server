export enum TrackType {
  TIME = 'TIME',
  QUANTITY = 'QUANTITY',
}

export interface Activity {
  id: string;
  ownerId: string;
  trackType: TrackType;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
