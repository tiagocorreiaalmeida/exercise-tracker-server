import {
  MutationResolvers,
  QueryResolvers,
} from '../../../../../shared/infra/graphql/generated/typed-schema';
import { UserInputError } from 'apollo-server-express';

export const resolvers = {
  Mutation: {
    async login(_, { data }, { useCases }: GraphQLModules.Context) {
      const dataOrError = await useCases.user.login.execute(data);
      if (dataOrError.isError) {
        throw new UserInputError(dataOrError.getErrorMessage());
      }

      return dataOrError.getValue();
    },
    async register(_, { data }, { useCases }: GraphQLModules.Context) {
      const userOrError = await useCases.user.createUser.execute(data);
      if (userOrError.isError) {
        throw new UserInputError(userOrError.getErrorMessage());
      }

      return userOrError.getValue();
    },
  } as MutationResolvers,
  Query: {
    test() {
      return 'server up';
    },
  } as QueryResolvers,
};
