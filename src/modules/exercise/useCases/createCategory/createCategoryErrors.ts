import { ConflictError, ForbiddenError } from '../../../../shared/core/Errors';

export const DUPLICATED_CATEGORY_NAME = new ConflictError(
  'A category with the same name already exists',
  'name',
);

export const USER_NOT_FOUND = new ConflictError('User not found');

export const PERMISSION_DENIED = new ForbiddenError('No permission to create a category');
