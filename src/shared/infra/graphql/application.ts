import { createApplication, createModule, gql } from 'graphql-modules';

const testModule = createModule({
  id: 'test-module',
  typeDefs: gql`
    type Query {
      test: String!
    }
  `,
  resolvers: {
    Query: {
      test: () => 'Server running',
    },
  },
});

export const application = createApplication({
  modules: [testModule],
});

export const subscribe = application.createSubscription();
