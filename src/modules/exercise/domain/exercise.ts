export enum TrackType {
  TIME = 'TIME',
  QUANTITY = 'QUANTITY',
}

export interface Exercise {
  id: string;
  ownerId: string;
  trackType: TrackType;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
