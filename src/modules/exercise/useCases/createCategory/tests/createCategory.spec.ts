import { CreateCategoryUseCase } from '../createCategoryUseCase';
import { InMemoryCategoryRepo } from '../../../infra/repos/tests/inMemoryCategoryRepo';
import { InMemoryUserRepo } from '../../../../user/infra/repos/tests/inMemoryUserRepo';
import {
  DUPLICATED_CATEGORY_NAME,
  USER_NOT_FOUND,
  PERMISSION_DENIED,
} from '../createCategoryErrors';
import { generateUserCreateData } from '../../../../../shared/utils/tests/user';
import { generateCategoryCreateData } from '../../../../../shared/utils/tests/category';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from '../createCategoryValidator';
import { invalidLengthError } from '../../../../../shared/logic/ErrorMessages';
import { ValidationError } from '../../../../../shared/core/Errors';
import { UniqueEntityID } from '../../../../../shared/core/UniqueEntityID';

const nameError = invalidLengthError('name', {
  min: MIN_NAME_LENGTH,
  max: MAX_NAME_LENGTH,
});

describe('CreateCategory', () => {
  const userRepo = new InMemoryUserRepo();
  const categoryRepo = new InMemoryCategoryRepo();
  const user = generateUserCreateData();
  const admin = generateUserCreateData(true);
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo, userRepo);

  const validDto = generateCategoryCreateData(admin.id);

  beforeAll(async () => {
    await userRepo.save(user);
    await userRepo.save(admin);
  });

  it('Should reject a smaller name than the required', async () => {
    const result = await createCategoryUseCase.execute({
      ...validDto,
      name: 'a'.repeat(MIN_NAME_LENGTH - 1),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(
      new ValidationError(nameError.message, nameError.field),
    );
  });

  it('Should reject a bigger name than the allowed', async () => {
    const result = await createCategoryUseCase.execute({
      ...validDto,
      name: 'a'.repeat(MAX_NAME_LENGTH + 1),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(
      new ValidationError(nameError.message, nameError.field),
    );
  });

  it('should refuse a non existent user', async () => {
    const result = await createCategoryUseCase.execute({
      ...validDto,
      ownerId: new UniqueEntityID().toString(),
    });

    expect(result.isError).toBeTruthy();

    expect(result.getError()).toStrictEqual(USER_NOT_FOUND);
  });

  it('should refuse a user without admin privilege', async () => {
    const result = await createCategoryUseCase.execute({
      ...validDto,
      ownerId: user.id,
    });

    expect(result.isError).toBeTruthy();
    expect(result.getError()).toStrictEqual(PERMISSION_DENIED);
  });

  it('should create,persist and return a valid CreateCategoryDTOResponse', async () => {
    const result = await createCategoryUseCase.execute(validDto);
    expect(result.isError).toBeFalsy();

    const response = result.getValue();
    expect(response.name).toEqual(validDto.name);
    expect(response.ownerId).toEqual(validDto.ownerId);
    expect(response.id).toBeDefined();

    const categoryExists = await categoryRepo.exists(response.id);
    expect(categoryExists).toBeTruthy();
  });

  it('should refuse a duplicated category name', async () => {
    const result = await createCategoryUseCase.execute(validDto);

    expect(result.isError).toBeTruthy();
    expect(result.getError()).toStrictEqual(DUPLICATED_CATEGORY_NAME);
  });
});
