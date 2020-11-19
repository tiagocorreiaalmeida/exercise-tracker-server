import { CreateUserUseCase } from './createUser/createUserUseCase';
import { LoginUseCase } from './login/login';
import { UserRepo } from '../domain/repos/userRepo';
import { AuthService } from '../services/auth/authService';
import { PasswordService } from '../services/password';

export type UserUseCases = (
  userRepo: UserRepo,
  authService: AuthService,
  passwordService: PasswordService,
) => {
  createUser: CreateUserUseCase;
  login: LoginUseCase;
};

export const userUseCases: UserUseCases = (userRepo, authService, passwordService) => ({
  createUser: new CreateUserUseCase(userRepo),
  login: new LoginUseCase(userRepo, authService, passwordService),
});
