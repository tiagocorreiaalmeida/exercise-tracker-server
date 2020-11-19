import { BcryptPasswordService } from '../modules/user/services/password/bcryptPasswordService';
import { LocalAuthProvider } from '../modules/user/services/auth/localAuthProvider';

export const userServices = {
  auth: new LocalAuthProvider(),
  password: new BcryptPasswordService(),
};
