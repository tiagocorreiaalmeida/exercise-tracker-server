import { userUseCases } from '../modules/user/useCases';
import { UserRepo } from '../modules/user/infra/repos/tests/inMemoryUserRepo';
import { BcryptPasswordService } from '../modules/user/services/password/bcryptPasswordService';
import { AuthService } from '../modules/user/services/auth';
import { exerciseUseCases } from '../modules/exercise/useCases';
import { ExerciseRepo } from '../modules/exercise/infra/repos/tests/inMemoryExerciseRepo';
import { ExerciseLogRepo } from '../modules/exercise/infra/repos/tests/inMemoryExerciseLogRepo';
import { CategoryRepo } from '../modules/exercise/infra/repos/tests/inMemoryCategoryRepo';

interface BootstrapUseCasesServices {
  auth: AuthService;
  password: BcryptPasswordService;
}

export interface UseCases {
  user: ReturnType<typeof userUseCases>;
  exercise: ReturnType<typeof exerciseUseCases>;
}

type UseCasesBootstrap = (services: BootstrapUseCasesServices) => UseCases;

export const useCasesBootstrap: UseCasesBootstrap = (services: BootstrapUseCasesServices) => ({
  user: userUseCases({
    userRepo: UserRepo,
    authService: services.auth,
    passwordService: services.password,
  }),
  exercise: exerciseUseCases({
    userRepo: UserRepo,
    exerciseLogRepo: ExerciseLogRepo,
    exerciseRepo: ExerciseRepo,
    categoryRepo: CategoryRepo,
  }),
});
