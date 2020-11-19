import { Result } from '../../core/Result';
import { missingParamError } from '../ErrorMessages';
import { Validator } from './Validator';
import { ValidationError } from '../../core/Errors';

export class RequiredFieldValidator<T> implements Validator<T> {
  constructor(private readonly fieldName: keyof T) {}

  validate(input: T): Result<T> {
    if (!input[this.fieldName]) {
      const { message, field } = missingParamError(this.fieldName.toString());
      return Result.fail<T>(new ValidationError(message, field));
    }

    return Result.success<T>(input);
  }
}
