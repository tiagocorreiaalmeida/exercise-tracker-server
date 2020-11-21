import { Resolvers } from '../../../../../shared/infra/graphql/generated/typed-schema';
import { UserInputError } from 'apollo-server-express';

export const resolvers = {
  Mutation: {
    async createActivity(_, { data }, { useCases, userId }: GraphQLModules.AuthContext) {
      const dataOrError = await useCases.activity.createActivity.execute({
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
