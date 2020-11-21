import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const activityModule = createModule({
  id: 'activity-module',
  typeDefs,
  resolvers,
});

export { activityModule };
