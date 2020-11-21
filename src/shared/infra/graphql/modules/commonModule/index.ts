import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const commonModule = createModule({
  id: 'common-module',
  typeDefs,
  resolvers,
});

export { commonModule };
