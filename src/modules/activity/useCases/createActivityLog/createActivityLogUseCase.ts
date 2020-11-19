import { UseCase } from '../../../../shared/core/useCase';
import { CreateActivityLogDTO, CreateActivityLogDTOResponse } from './createActivityLogUseCaseDTO';
import { Result } from '../../../../shared/core/Result';
import { ActivityRepo } from '../../domain/repos/activityRepo';
import { validateActivityCreate } from './createActivityLogValidator';
import { ACTIVITY_NOT_FOUND } from './createActivityLogErrors';
import { UniqueEntityID } from '../../../../shared/core/UniqueEntityID';
import { ActivityLogRepo } from '../../domain/repos/activityLogRepo';

export class CreateActivityUseCase
  implements UseCase<CreateActivityLogDTO, Result<CreateActivityLogDTOResponse>> {
  constructor(private activityLogRepo: ActivityLogRepo, private activityRepo: ActivityRepo) {}
  async execute(dto: CreateActivityLogDTO): Promise<Result<CreateActivityLogDTOResponse>> {
    const validation = validateActivityCreate(dto);

    if (validation.isError) {
      return Result.fail<CreateActivityLogDTOResponse>(validation.getError());
    }

    const activityExists = await this.activityRepo.exists(dto.activityId);
    if (!activityExists) {
      return Result.fail<CreateActivityLogDTOResponse>(ACTIVITY_NOT_FOUND);
    }

    const activityLog = await this.activityLogRepo.save({
      ...dto,
      id: new UniqueEntityID().toString(),
    });

    return Result.success<CreateActivityLogDTOResponse>(activityLog);
  }
}
