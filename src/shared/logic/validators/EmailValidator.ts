import { Result } from '../../core/Result';
import { invalidParamError } from '../ErrorMessages';
import { Validator } from './Validator';
import { validator } from '../../utils/validator';
import { ValidationError } from '../../core/Errors';

type EmailField<T> = keyof T & string;

export class EmailValidator<T> implements Validator<T> {
  constructor(private readonly emailFieldName: EmailField<T>) {}

  validate(input: T): Result<T> {
    const email = input[this.emailFieldName];

    const isEmail = validator.isEmail(`${email}`);

    if (!isEmail) {
      const { message, field } = invalidParamError('email');
      return Result.fail<T>(new ValidationError(message, field));
    }

    return Result.success<T>(input);
  }
}
