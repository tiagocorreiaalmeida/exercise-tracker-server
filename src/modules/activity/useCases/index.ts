import { UserRepo } from '../../user/domain/repos/userRepo';
import { ActivityLogRepo } from '../domain/repos/activityLogRepo';
import { ActivityRepo } from '../domain/repos/activityRepo';
import { CreateActivityUseCase } from './createActivity/createActivityUseCase';
import { CreateActivityLogUseCase } from './createActivityLog/createActivityLogUseCase';

interface ActivityUseCasesDependencies {
  activityRepo: ActivityRepo;
  activityLogRepo: ActivityLogRepo;
  userRepo: UserRepo;
}

export type ActivityUseCases = (
  dependencies: ActivityUseCasesDependencies,
) => {
  createActivity: CreateActivityUseCase;
  createActivityLog: CreateActivityLogUseCase;
};

export const activityUseCases: ActivityUseCases = ({
  activityLogRepo,
  activityRepo,
  userRepo,
}) => ({
  createActivity: new CreateActivityUseCase(activityRepo, userRepo),
  createActivityLog: new CreateActivityLogUseCase(activityLogRepo, activityRepo),
});
