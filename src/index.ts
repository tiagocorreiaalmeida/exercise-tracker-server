import { PubSub } from 'apollo-server-express';

import { useCasesBootstrap } from './bootstrap/useCases';
import { userServices } from './bootstrap/services';
import { startServer } from './shared/infra/graphql/server';
import { getContext } from './shared/infra/graphql/context';
import { UserRepo } from './modules/user/infra/repos/tests/inMemoryUserRepo';

const pubSub = new PubSub();

const useCases = useCasesBootstrap(userServices);
const context = getContext({
  useCases,
  authService: userServices.auth,
  pubSub,
  userRepo: UserRepo, //review if this should be exposed as context
});

startServer(context);
