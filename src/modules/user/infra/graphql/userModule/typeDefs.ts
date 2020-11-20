import { gql } from 'graphql-modules';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    test: String!
  }

  type Mutation {
    login(data: LoginInput!): LoginPayload!
    register(data: RegisterInput!): User!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    username: String!
  }

  type LoginPayload {
    user: User!
    accessToken: String!
    refreshToken: String!
  }
`;
