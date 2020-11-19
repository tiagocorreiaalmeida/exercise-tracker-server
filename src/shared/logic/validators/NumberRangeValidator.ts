import { validator } from '../../utils/validator';
import { Result } from '../../core/Result';
import { invalidRangeError } from '../ErrorMessages';
import { Validator } from './Validator';
import { ValidationError } from '../../core/Errors';

interface FieldRangeOptions {
  min: number;
  max?: number;
}

export class NumberRangeValidator<T> implements Validator<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly fieldRangeOptions?: FieldRangeOptions,
  ) {}

  validate(input: T): Result<T> {
    const min = this.fieldRangeOptions?.min ?? 1;
    const max = this.fieldRangeOptions?.max;

    const field = input[this.fieldName];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const isValid = validator.isRange({ value: field, min, max });

    if (!isValid) {
      const { message, field } = invalidRangeError(`${this.fieldName}`, { min, max });
      return Result.fail<T>(new ValidationError(message, field));
    }

    return Result.success<T>(input);
  }
}
