import { ConflictError } from '../../../../shared/core/Errors';

export const DUPLICATED_ACTIVITY_NAME = new ConflictError(
  'You already have an activity with the given name',
  'name',
);

export const USER_NOT_FOUND = new ConflictError('User not found');
