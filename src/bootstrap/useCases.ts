import { userUseCases } from '../modules/user/useCases';
import { UserRepo } from '../modules/user/infra/repos/tests/inMemoryUserRepo';
import { BcryptPasswordService } from '../modules/user/services/password/bcryptPasswordService';
import { AuthService } from '../modules/user/services/auth';
import { activityUseCases } from '../modules/activity/useCases';
import { ActivityRepo } from '../modules/activity/infra/repos/tests/inMemoryActivityRepo';
import { ActivityLogRepo } from '../modules/activity/infra/repos/tests/inMemoryActivityLogRepo';

interface BootstrapUseCasesServices {
  auth: AuthService;
  password: BcryptPasswordService;
}

export interface UseCases {
  user: ReturnType<typeof userUseCases>;
  activity: ReturnType<typeof activityUseCases>;
}

type UseCasesBootstrap = (services: BootstrapUseCasesServices) => UseCases;

export const useCasesBootstrap: UseCasesBootstrap = (services: BootstrapUseCasesServices) => ({
  user: userUseCases({
    userRepo: UserRepo,
    authService: services.auth,
    passwordService: services.password,
  }),
  activity: activityUseCases({
    userRepo: UserRepo,
    activityLogRepo: ActivityLogRepo,
    activityRepo: ActivityRepo,
  }),
});
