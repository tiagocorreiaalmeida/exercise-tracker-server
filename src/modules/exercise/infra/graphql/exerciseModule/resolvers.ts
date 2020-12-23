import { Resolvers } from '../../../../../shared/infra/graphql/generated/typed-schema';
import { UserInputError } from 'apollo-server-express';

export const resolvers = {
  Mutation: {
    async createExercise(_, { data }, { useCases, userId }: GraphQLModules.AuthContext) {
      const dataOrError = await useCases.exercise.createExercise.execute({
        ...data,
        ownerId: userId,
      });
      if (dataOrError.isError) {
        throw new UserInputError(dataOrError.getErrorMessage());
      }

      return dataOrError.getValue();
    },
  },
} as Resolvers;
