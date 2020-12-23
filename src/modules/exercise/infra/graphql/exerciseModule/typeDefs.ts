import { gql } from 'graphql-modules';

export const typeDefs = gql`
  enum TrackType {
    TIME
    QUANTITY
  }

  type Exercise {
    id: ID!
    ownerId: ID!
    name: String!
    trackType: TrackType!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    createExercise(data: CreateExerciseInput!): Exercise!
    createGlobalExercise(data: CreateExerciseInput!): Exercise!
  }

  input CreateExerciseInput {
    name: String!
    trackType: TrackType!
  }
`;
