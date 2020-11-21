import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';

import { Resolvers } from '../../../../../shared/infra/graphql/generated/typed-schema';

export const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Time: GraphQLTime,
} as Resolvers;
