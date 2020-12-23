import { Result } from '../../../../shared/core/Result';
import { NumberRangeValidator } from '../../../../shared/logic/validators/NumberRangeValidator';
import { ValidatorComposite } from '../../../../shared/logic/validators/ValidatorComposite';
import { CreateExerciseLogDTO } from './createExerciseLogUseCaseDTO';

export const MIN_QUANTITY = 1;

export const validateExerciseCreate = (dto: CreateExerciseLogDTO): Result<CreateExerciseLogDTO> => {
  const validations = new ValidatorComposite<CreateExerciseLogDTO>();
  validations.add(
    new NumberRangeValidator<CreateExerciseLogDTO>('quantity', {
      min: MIN_QUANTITY,
    }),
  );

  return validations.validate(dto);
};
