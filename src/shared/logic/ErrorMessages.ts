interface ErrorWithField {
  message: string;
  field: string;
}

export const missingParamError = (paramName: string): ErrorWithField => ({
  message: `Missing param: ${paramName}`,
  field: paramName,
});

export const invalidParamError = (paramName: string): ErrorWithField => ({
  message: `Invalid param: ${paramName}`,
  field: paramName,
});

export const invalidLengthError = (
  paramName: string,
  { min, max }: { min: number; max?: number },
): ErrorWithField => ({
  message: max
    ? `${paramName} should be between ${min} and ${max} characters.`
    : `${paramName} should be at least ${min} characters long.`,
  field: paramName,
});

export const invalidRangeError = (
  paramName: string,
  { min, max }: { min: number; max?: number },
): ErrorWithField => ({
  message: max
    ? `${paramName} should be between ${min} and ${max}.`
    : `${paramName} should be at least ${min}.`,
  field: paramName,
});
