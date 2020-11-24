import { gql } from 'graphql-modules';

export const typeDefs = gql`
  enum TrackType {
    TIME
    QUANTITY
  }

  type Activity {
    id: ID!
    ownerId: ID!
    name: String!
    trackType: TrackType!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    createActivity(data: CreateActivityInput!): Activity!
  }

  input CreateActivityInput {
    name: String!
    trackType: TrackType!
  }
`;
