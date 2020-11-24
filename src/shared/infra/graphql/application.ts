import { createApplication } from 'graphql-modules';

import { commonModule } from './modules/commonModule';
import { userModule } from '../../../modules/user/infra/graphql/userModule';
import { activityModule } from '../../../modules/activity/infra/graphql/activityModule';
import { activityLogModule } from '../../../modules/activity/infra/graphql/activityLogModule';

export const application = createApplication({
  modules: [commonModule, userModule, activityModule, activityLogModule],
});

export const subscribe = application.createSubscription();
