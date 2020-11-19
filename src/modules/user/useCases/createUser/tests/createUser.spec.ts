import faker from 'faker';

import { CreateUserUseCase } from '../createUserUseCase';
import { CreateUserUseCaseDTO } from '../createUserUseCaseDTO';
import { InMemoryUserRepo } from '../../../infra/repos/tests/inMemoryUserRepo';
import { invalidLengthError, invalidParamError } from '../../../../../shared/logic/ErrorMessages';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from '../createUserValidator';
import { EMAIL_EXISTS_ERROR, USERNAME_EXISTS_ERROR } from '../createUserErrors';
import { ValidationError } from '../../../../../shared/core/Errors';

interface SutProps {
  sut: CreateUserUseCase;
  validDto: CreateUserUseCaseDTO;
  userRepo: InMemoryUserRepo;
}

const fakeUserRepo = new InMemoryUserRepo();
const validDto: CreateUserUseCaseDTO = {
  email: faker.internet.email(),
  password: '1'.repeat(PASSWORD_MIN_LENGTH),
  username: '1'.repeat(USERNAME_MIN_LENGTH),
};

const makeSut = (): SutProps => {
  const sut = new CreateUserUseCase(fakeUserRepo);

  return {
    sut,
    validDto,
    userRepo: fakeUserRepo,
  };
};

describe('Create User', () => {
  it('Should reject an invalid email', async () => {
    const { sut, validDto } = makeSut();

    const result = await sut.execute({
      ...validDto,
      email: 'fakeemail',
    });
    expect(result.isError).toBeTruthy();

    const error = invalidParamError('email');
    expect(result.getError()).toStrictEqual(new ValidationError(error.message, error.field));
  });

  it('Should reject a smaller password than the required', async () => {
    const { sut, validDto } = makeSut();

    const result = await sut.execute({
      ...validDto,
      password: '1'.repeat(PASSWORD_MIN_LENGTH - 1),
    });
    expect(result.isError).toBeTruthy();

    const error = invalidLengthError('password', {
      min: PASSWORD_MIN_LENGTH,
      max: PASSWORD_MAX_LENGTH,
    });
    expect(result.getError()).toStrictEqual(new ValidationError(error.message, error.field));
  });

  it('Should reject a bigger password than the allowed', async () => {
    const { sut, validDto } = makeSut();

    const result = await sut.execute({
      ...validDto,
      password: '1'.repeat(PASSWORD_MAX_LENGTH + 1),
    });
    expect(result.isError).toBeTruthy();

    const error = invalidLengthError('password', {
      min: PASSWORD_MIN_LENGTH,
      max: PASSWORD_MAX_LENGTH,
    });
    expect(result.getError()).toStrictEqual(new ValidationError(error.message, error.field));
  });

  it('Should reject a smaller username than the required', async () => {
    const { sut, validDto } = makeSut();

    const result = await sut.execute({
      ...validDto,
      username: '1'.repeat(USERNAME_MIN_LENGTH - 1),
    });
    expect(result.isError).toBeTruthy();

    const error = invalidLengthError('username', {
      min: USERNAME_MIN_LENGTH,
      max: USERNAME_MAX_LENGTH,
    });
    expect(result.getError()).toStrictEqual(new ValidationError(error.message, error.field));
  });

  it('Should reject a bigger username than the allowed', async () => {
    const { sut, validDto } = makeSut();

    const result = await sut.execute({
      ...validDto,
      username: '1'.repeat(USERNAME_MAX_LENGTH + 1),
    });
    expect(result.isError).toBeTruthy();

    const error = invalidLengthError('username', {
      min: USERNAME_MIN_LENGTH,
      max: USERNAME_MAX_LENGTH,
    });
    expect(result.getError()).toStrictEqual(new ValidationError(error.message, error.field));
  });

  it('should create,persist and return a valid user', async () => {
    const { sut, validDto, userRepo } = makeSut();

    const result = await sut.execute(validDto);
    expect(result.isError).toBeFalsy();

    const response = result.getValue();
    expect(response.email).toEqual(validDto.email);
    expect(response.username).toEqual(validDto.username);
    expect(response.id).toBeDefined();

    const userExists = await userRepo.exists(response.id);
    expect(userExists).toBeTruthy();
  });

  it('should refuse a duplicated email', async () => {
    const { sut, validDto } = makeSut();

    const result = await sut.execute(validDto);
    expect(result.isError).toBeTruthy();
    expect(result.getError()).toStrictEqual(EMAIL_EXISTS_ERROR);
  });

  it('should refuse a duplicated username', async () => {
    const { sut, validDto } = makeSut();

    const result = await sut.execute({
      ...validDto,
      email: faker.internet.email(),
    });
    expect(result.isError).toBeTruthy();
    expect(result.getError()).toStrictEqual(USERNAME_EXISTS_ERROR);
  });
});
