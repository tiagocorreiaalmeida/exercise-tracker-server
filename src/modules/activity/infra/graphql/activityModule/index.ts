import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { isAuthenticatedMiddleware } from '../../../../../shared/infra/graphql/middlewares';

const activityModule = createModule({
  id: 'activity-module',
  typeDefs,
  resolvers,
  middlewares: {
    Mutation: {
      createActivity: [isAuthenticatedMiddleware],
    },
  },
});

export { activityModule };
