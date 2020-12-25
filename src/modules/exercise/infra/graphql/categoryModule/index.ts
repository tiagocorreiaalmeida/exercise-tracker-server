import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import {
  isAuthenticatedMiddleware,
  isAdminMiddleware,
} from '../../../../../shared/infra/graphql/middlewares';

const categoryModule = createModule({
  id: 'category-module',
  typeDefs,
  resolvers,
  middlewares: {
    Mutation: {
      createCategory: [isAuthenticatedMiddleware, isAdminMiddleware],
    },
  },
});

export { categoryModule };
