import { userUseCases } from '../modules/user/useCases';
import { UserRepo } from '../modules/user/infra/repos/tests/inMemoryUserRepo';
import { BcryptPasswordService } from '../modules/user/services/password/bcryptPasswordService';
import { AuthService } from '../modules/user/services/auth';

interface BootstrapUseCasesServices {
  auth: AuthService;
  password: BcryptPasswordService;
}

export interface UseCases {
  user: ReturnType<typeof userUseCases>;
}

type UseCasesBootstrap = (services: BootstrapUseCasesServices) => UseCases;

export const useCasesBootstrap: UseCasesBootstrap = (services: BootstrapUseCasesServices) => ({
  user: userUseCases(UserRepo, services.auth, services.password),
});
