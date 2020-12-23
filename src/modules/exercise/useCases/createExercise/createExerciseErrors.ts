import { ConflictError, ForbiddenError } from '../../../../shared/core/Errors';

export const DUPLICATED_EXERCISE_NAME = new ConflictError(
  'You already have an exercise with the given name',
  'name',
);

export const USER_NOT_FOUND = new ConflictError('User not found');

export const PERMISSION_DENIED = new ForbiddenError('No permission to create a shared exercise');
