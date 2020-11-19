import { AuthenticationError } from 'apollo-server-express';

export const isAuthenticatedMiddleware = (
  { context }: { context: GraphQLModules.Context },
  next: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (!context.userId) {
    throw new AuthenticationError('Authentication required');
  }

  return next();
};
