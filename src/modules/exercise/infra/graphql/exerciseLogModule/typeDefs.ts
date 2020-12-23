import { gql } from 'graphql-modules';

export const typeDefs = gql`
  type ExerciseLog {
    id: ID!
    exerciseId: ID!
    quantity: Int!
    practicedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    createExerciseLog(data: CreateExerciseLogInput!): ExerciseLog!
  }

  input CreateExerciseLogInput {
    exerciseId: ID!
    quantity: Int!
    practicedAt: DateTime!
  }
`;
