import { gql } from 'graphql-modules';

export const typeDefs = gql`
  type ActivityLog {
    id: ID!
    activityId: ID!
    quantity: Int!
    practicedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    createActivityLog(data: CreateActivityLogInput!): ActivityLog!
  }

  input CreateActivityLogInput {
    activityId: ID!
    quantity: Int!
    practicedAt: DateTime!
  }
`;
