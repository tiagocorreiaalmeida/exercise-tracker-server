import externalValidator from 'validator';

type isLengthArgs = { value: string; min?: number; max?: number };
type isRangeArgs = { value: number; min: number; max?: number };

interface Validator {
  isEmail(email: string): boolean;
  isLength(args: isLengthArgs): boolean;
  isRange(args: isRangeArgs): boolean;
}

export const validator: Validator = {
  isEmail(email: string) {
    return externalValidator.isEmail(email);
  },
  isLength({ value, min, max }: isLengthArgs) {
    return externalValidator.isLength(value, { min, max });
  },
  isRange({ value, min, max }: isRangeArgs) {
    return value >= min && (typeof max === 'undefined' || value <= max);
  },
};
