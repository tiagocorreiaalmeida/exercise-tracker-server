import { createApplication } from 'graphql-modules';

import { userModule } from '../../../modules/user/infra/graphql/userModule';
import { activityModule } from '../../../modules/activity/infra/graphql/activityModule';
import { commonModule } from './modules/commonModule';

export const application = createApplication({
  modules: [commonModule, userModule, activityModule],
});

export const subscribe = application.createSubscription();
