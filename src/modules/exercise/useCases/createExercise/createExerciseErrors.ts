import { ConflictError } from '../../../../shared/core/Errors';

export const DUPLICATED_EXERCISE_NAME = new ConflictError(
  'You already have an exercise with the given name',
  'name',
);

export const USER_NOT_FOUND = new ConflictError('User not found');
