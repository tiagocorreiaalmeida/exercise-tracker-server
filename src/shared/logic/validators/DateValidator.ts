import { Result } from '../../core/Result';
import { Validator } from './Validator';
import { validator } from '../../utils/validator';
import { ValidationError } from '../../core/Errors';
import { invalidDate } from '../ErrorMessages';

export class DateVlidator<T> implements Validator<T> {
  constructor(private readonly fieldName: keyof T) {}

  validate(input: T): Result<T> {
    const date = input[this.fieldName];

    const isEmail = validator.isDate(`${date}`);

    if (!isEmail) {
      const { message, field } = invalidDate(this.fieldName.toString());
      return Result.fail<T>(new ValidationError(message, field));
    }

    return Result.success<T>(input);
  }
}
