export interface ExerciseLog {
  id: string;
  exerciseId: string;
  quantity: number; //Depending on the type it can be represented as a number of repetions or duration in seconds
  practicedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
