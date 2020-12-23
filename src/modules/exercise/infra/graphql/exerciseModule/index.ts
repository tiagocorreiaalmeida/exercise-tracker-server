import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { isAuthenticatedMiddleware } from '../../../../../shared/infra/graphql/middlewares';

const exerciseModule = createModule({
  id: 'exercise-module',
  typeDefs,
  resolvers,
  middlewares: {
    Mutation: {
      createExercise: [isAuthenticatedMiddleware],
    },
  },
});

export { exerciseModule };
