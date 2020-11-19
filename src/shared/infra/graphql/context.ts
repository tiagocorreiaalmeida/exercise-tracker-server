/* eslint-disable @typescript-eslint/no-namespace */
import { PubSub } from 'graphql-subscriptions';
import { Response, Request } from 'express';
import { ExecutionParams } from 'subscriptions-transport-ws';

import { UseCases } from '../../../bootstrap/useCases';
import { AuthService } from '../../../modules/user/services/auth/authService';

declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      useCases: UseCases;
      req: Request;
      res: Response;
      userId?: string;
      pubSub: PubSub;
    }
  }
}

type Context = GraphQLModules.GlobalContext;

export const getContext = ({
  authService,
  useCases,
  pubSub,
}: {
  authService: AuthService;
  useCases: UseCases;
  pubSub: PubSub;
}) => async ({
  req,
  res,
  connection,
}: {
  req: Request;
  res: Response;
  connection?: ExecutionParams;
}): Promise<Context> => {
  const header = connection ? connection.context.Authorization : req.headers.authorization;

  const token = header?.replace('Bearer ', '');
  let userId: string | undefined;

  if (token) {
    try {
      const decodedToken = await authService.decodeAccessToken(token);
      userId = decodedToken.userId;
    } catch (e) {}
  }

  return {
    req,
    res,
    pubSub,
    useCases,
    userId,
  };
};
