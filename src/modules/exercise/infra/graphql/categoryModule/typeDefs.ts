import { gql } from 'graphql-modules';

export const typeDefs = gql`
  type Category {
    id: ID!
    ownerId: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    createCategory(data: CreateCategoryInput!): Category!
  }

  input CreateCategoryInput {
    name: String!
  }
`;
