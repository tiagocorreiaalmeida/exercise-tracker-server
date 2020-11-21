import { CreateUserUseCase } from './createUser/createUserUseCase';
import { LoginUseCase } from './login/login';
import { UserRepo } from '../domain/repos/userRepo';
import { AuthService } from '../services/auth/authService';
import { PasswordService } from '../services/password';

interface UserUseCasesDependencies {
  userRepo: UserRepo;
  authService: AuthService;
  passwordService: PasswordService;
}

export type UserUseCases = (
  args: UserUseCasesDependencies,
) => {
  createUser: CreateUserUseCase;
  login: LoginUseCase;
};

export const userUseCases: UserUseCases = ({ userRepo, authService, passwordService }) => ({
  createUser: new CreateUserUseCase(userRepo),
  login: new LoginUseCase(userRepo, authService, passwordService),
});
