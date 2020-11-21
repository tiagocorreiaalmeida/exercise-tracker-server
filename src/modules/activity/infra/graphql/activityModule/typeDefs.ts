import { gql } from 'graphql-modules';

export const typeDefs = gql`
  enum TrackType {
    TIME
    QUANTITY
  }

  type Activity {
    id: ID!
    ownerId: ID!
    owner: User!
    name: String!
    trackType: TrackType!
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Mutation {
    createActivity(data: CreateActivityInput!): Activity!
  }

  input CreateActivityInput {
    ownerId: ID!
    name: String!
    trackType: TrackType!
  }
`;
