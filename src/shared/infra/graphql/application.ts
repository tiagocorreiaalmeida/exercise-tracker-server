import { createApplication } from 'graphql-modules';

import { commonModule } from './modules/commonModule';
import { userModule } from '../../../modules/user/infra/graphql/userModule';
import { exerciseModule } from '../../../modules/exercise/infra/graphql/exerciseModule';
import { exerciseLogModule } from '../../../modules/exercise/infra/graphql/exerciseLogModule';

export const application = createApplication({
  modules: [commonModule, userModule, exerciseModule, exerciseLogModule],
});

export const subscribe = application.createSubscription();
