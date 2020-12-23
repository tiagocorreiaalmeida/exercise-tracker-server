import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

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

export const isAdminMiddleware = async (
  { context }: { context: GraphQLModules.Context },
  next: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = await context.userRepo.findById(context.userId!); //review if the repo should be avaible at the context

  if (!user?.isAdmin) {
    throw new ForbiddenError('No permissions');
  }

  return next();
};
