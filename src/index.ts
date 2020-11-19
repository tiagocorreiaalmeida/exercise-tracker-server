import { PubSub } from 'apollo-server-express';

import { useCasesBootstrap } from './bootstrap/useCases';
import { userServices } from './bootstrap/services';
import { startServer } from './shared/infra/graphql/server';
import { getContext } from './shared/infra/graphql/context';

const pubSub = new PubSub();

const useCases = useCasesBootstrap(userServices);
const context = getContext({ useCases, authService: userServices.auth, pubSub });

startServer(context);
