import faker from 'faker';

import { BcryptPasswordService } from '../../../modules/user/services/password/bcryptPasswordService';
import { PASSWORD_MIN_LENGTH } from '../../../modules/user/useCases/createUser/createUserValidator';
import { UniqueEntityID } from '../../core/UniqueEntityID';

const passwordService = new BcryptPasswordService();

export const generateUserCreateProps = () => {
  const password = 'a'.repeat(PASSWORD_MIN_LENGTH);

  return {
    id: new UniqueEntityID().toString(),
    email: faker.internet.email(),
    password: passwordService.hash(password),
    plainTextPassword: password,
    username: faker.internet.userName(),
  };
};
