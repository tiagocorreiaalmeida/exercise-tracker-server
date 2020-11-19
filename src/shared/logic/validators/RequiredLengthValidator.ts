import { validator } from '../../utils/validator';
import { Result } from '../../core/Result';
import { invalidLengthError } from '../ErrorMessages';
import { Validator } from './Validator';
import { ValidationError } from '../../core/Errors';

interface FieldLengthOptions {
  min: number;
  max?: number;
}

export class RequiredLengthValidator<T> implements Validator<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly fieldLengthOptions?: FieldLengthOptions,
  ) {}

  validate(input: T): Result<T> {
    const min = this.fieldLengthOptions?.min ?? 1;
    const max = this.fieldLengthOptions?.max;

    const field = input[this.fieldName];
    const isValid = validator.isLength({ value: `${field}`, min, max });

    if (!isValid) {
      const { message, field } = invalidLengthError(`${this.fieldName}`, { min, max });
      return Result.fail<T>(new ValidationError(message, field));
    }

    return Result.success<T>(input);
  }
}
