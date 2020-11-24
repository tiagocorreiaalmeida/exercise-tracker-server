import { Resolvers } from '../../../../../shared/infra/graphql/generated/typed-schema';
import { UserInputError } from 'apollo-server-express';

export const resolvers = {
  Mutation: {
    async createActivityLog(_, { data }, { useCases, userId }: GraphQLModules.AuthContext) {
      const dataOrError = await useCases.activity.createActivityLog.execute({
        ...data,
        userId,
      });

      if (dataOrError.isError) {
        throw new UserInputError(dataOrError.getErrorMessage());
      }

      return dataOrError.getValue();
    },
  },
} as Resolvers;
