import { Result } from '../../../../shared/core/Result';
import { RequiredLengthValidator } from '../../../../shared/logic/validators/RequiredLengthValidator';
import { ValidatorComposite } from '../../../../shared/logic/validators/ValidatorComposite';
import { CreateCategoryDTO } from './createCategoryUseCaseDto';

export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 80;

export const validateCategoryCreate = (dto: CreateCategoryDTO): Result<CreateCategoryDTO> => {
  const validations = new ValidatorComposite<CreateCategoryDTO>();
  validations.add(
    new RequiredLengthValidator<CreateCategoryDTO>('name', {
      min: MIN_NAME_LENGTH,
      max: MAX_NAME_LENGTH,
    }),
  );

  return validations.validate(dto);
};
