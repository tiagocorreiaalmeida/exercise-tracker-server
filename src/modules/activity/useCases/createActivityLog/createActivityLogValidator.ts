import { Result } from '../../../../shared/core/Result';
import { NumberRangeValidator } from '../../../../shared/logic/validators/NumberRangeValidator';
import { ValidatorComposite } from '../../../../shared/logic/validators/ValidatorComposite';
import { CreateActivityLogDTO } from './createActivityLogUseCaseDTO';

export const MIN_QUANTITY = 1;

export const validateActivityCreate = (dto: CreateActivityLogDTO): Result<CreateActivityLogDTO> => {
  const validations = new ValidatorComposite<CreateActivityLogDTO>();
  validations.add(
    new NumberRangeValidator<CreateActivityLogDTO>('quantity', {
      min: MIN_QUANTITY,
    }),
  );

  return validations.validate(dto);
};
