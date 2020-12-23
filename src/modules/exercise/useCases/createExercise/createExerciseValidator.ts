import { Result } from '../../../../shared/core/Result';
import { RequiredLengthValidator } from '../../../../shared/logic/validators/RequiredLengthValidator';
import { ValidatorComposite } from '../../../../shared/logic/validators/ValidatorComposite';
import { CreateExerciseDTO } from './createExerciseUseCaseDTO';

export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 80;

export const validateExerciseCreate = (dto: CreateExerciseDTO): Result<CreateExerciseDTO> => {
  const validations = new ValidatorComposite<CreateExerciseDTO>();
  validations.add(
    new RequiredLengthValidator<CreateExerciseDTO>('name', {
      min: MIN_NAME_LENGTH,
      max: MAX_NAME_LENGTH,
    }),
  );

  return validations.validate(dto);
};
