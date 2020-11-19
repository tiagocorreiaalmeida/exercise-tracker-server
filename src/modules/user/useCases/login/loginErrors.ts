import { ConflictError } from '../../../../shared/core/Errors';

export const AUTHENTICATION_FAILED = new ConflictError(
  'Login failed, please verify your credentials!',
);

export const ACCOUNT_NOT_VERIFIED = new ConflictError('Account not verified!');
