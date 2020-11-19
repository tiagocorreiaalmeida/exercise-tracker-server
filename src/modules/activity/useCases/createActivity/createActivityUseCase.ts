import { UseCase } from '../../../../shared/core/useCase';
import { CreateActivityDTO, CreateActivityDTOResponse } from './createActivityUseCaseDTO';
import { Result } from '../../../../shared/core/Result';
import { ActivityRepo } from '../../domain/repos/activityRepo';
import { UserRepo } from '../../../user/domain/repos/userRepo';
import { validateActivityCreate } from './createActivityValidator';
import { DUPLICATED_ACTIVITY_NAME, USER_NOT_FOUND } from './createActivityErrors';
import { UniqueEntityID } from '../../../../shared/core/UniqueEntityID';

export class CreateActivityUseCase
  implements UseCase<CreateActivityDTO, Result<CreateActivityDTOResponse>> {
  constructor(private activityRepo: ActivityRepo, private userRepo: UserRepo) {}
  async execute(dto: CreateActivityDTO): Promise<Result<CreateActivityDTOResponse>> {
    const validation = validateActivityCreate(dto);

    if (validation.isError) {
      return Result.fail<CreateActivityDTOResponse>(validation.getError());
    }

    const userExists = await this.userRepo.exists(dto.ownerId);
    if (!userExists) {
      return Result.fail<CreateActivityDTOResponse>(USER_NOT_FOUND);
    }

    const activityExists = await this.activityRepo.findByNameAndOwner(dto.name, dto.ownerId);
    if (activityExists) {
      return Result.fail<CreateActivityDTOResponse>(DUPLICATED_ACTIVITY_NAME);
    }

    const activity = await this.activityRepo.save({
      ...dto,
      id: new UniqueEntityID().toString(),
    });

    return Result.success<CreateActivityDTOResponse>(activity);
  }
}
