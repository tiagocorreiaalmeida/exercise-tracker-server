import { Result } from '../../../../shared/core/Result';
import { RequiredLengthValidator } from '../../../../shared/logic/validators/RequiredLengthValidator';
import { ValidatorComposite } from '../../../../shared/logic/validators/ValidatorComposite';
import { CreateActivityDTO } from './createActivityUseCaseDTO';

export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 80;

export const validateActivityCreate = (dto: CreateActivityDTO): Result<CreateActivityDTO> => {
  const validations = new ValidatorComposite<CreateActivityDTO>();
  validations.add(
    new RequiredLengthValidator<CreateActivityDTO>('name', {
      min: MIN_NAME_LENGTH,
      max: MAX_NAME_LENGTH,
    }),
  );

  return validations.validate(dto);
};
