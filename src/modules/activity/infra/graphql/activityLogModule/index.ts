import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { isAuthenticatedMiddleware } from '../../../../../shared/infra/graphql/middlewares';

const activityLogModule = createModule({
  id: 'activity-log-module',
  typeDefs,
  resolvers,
  middlewares: {
    Mutation: {
      createActivityLog: [isAuthenticatedMiddleware],
    },
  },
});

export { activityLogModule };
