import { UseCase } from '../../../../shared/core/useCase';
import { CreateCategoryDTO, CreateCategoryResponse } from './createCategoryUseCaseDto';
import { Result } from '../../../../shared/core/Result';
import { CategoryRepo } from '../../domain/repos/categoryRepo';
import { UserRepo } from '../../../user/domain/repos/userRepo';
import { validateCategoryCreate } from './createCategoryValidator';
import {
  DUPLICATED_CATEGORY_NAME,
  USER_NOT_FOUND,
  PERMISSION_DENIED,
} from './createCategoryErrors';
import { UniqueEntityID } from '../../../../shared/core/UniqueEntityID';

export class CreateCategoryUseCase
  implements UseCase<CreateCategoryDTO, Result<CreateCategoryResponse>> {
  constructor(private categoryRepo: CategoryRepo, private userRepo: UserRepo) {}
  async execute(dto: CreateCategoryDTO): Promise<Result<CreateCategoryResponse>> {
    const validation = validateCategoryCreate(dto);

    if (validation.isError) {
      return Result.fail<CreateCategoryResponse>(validation.getError());
    }

    const user = await this.userRepo.findById(dto.ownerId);
    if (!user) {
      return Result.fail<CreateCategoryResponse>(USER_NOT_FOUND);
    }

    if (!user.isAdmin) {
      return Result.fail<CreateCategoryResponse>(PERMISSION_DENIED);
    }

    const categoryExists = await this.categoryRepo.findByName(dto.name);
    if (categoryExists) {
      return Result.fail<CreateCategoryResponse>(DUPLICATED_CATEGORY_NAME);
    }

    const category = await this.categoryRepo.save({
      ...dto,
      id: new UniqueEntityID().toString(),
    });

    return Result.success<CreateCategoryResponse>(category);
  }
}
