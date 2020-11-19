import { ConflictError } from '../../../../shared/core/Errors';

export const EMAIL_EXISTS_ERROR = new ConflictError(
  'An User with the given email already exists.',
  'email',
);

export const USERNAME_EXISTS_ERROR = new ConflictError(
  'An User with the given username already exists.',
  'username',
);
