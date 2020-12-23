import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { isAuthenticatedMiddleware } from '../../../../../shared/infra/graphql/middlewares';

const exerciseLogModule = createModule({
  id: 'exercise-log-module',
  typeDefs,
  resolvers,
  middlewares: {
    Mutation: {
      createExerciseLog: [isAuthenticatedMiddleware],
    },
  },
});

export { exerciseLogModule };
