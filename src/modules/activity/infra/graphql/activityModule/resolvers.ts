import { Resolvers } from '../../../../../shared/infra/graphql/generated/typed-schema';
import { UserInputError } from 'apollo-server-express';

export const resolvers = {
  Mutation: {
    async createActivity(_, { data }, { useCases, userId }: GraphQLModules.Context) {
      const dataOrError = await useCases.activity.createActivity.execute({
        ...data,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ownerId: userId!,
      });
      if (dataOrError.isError) {
        throw new UserInputError(dataOrError.getErrorMessage());
      }

      return dataOrError.getValue();
    },
  },
} as Resolvers;
