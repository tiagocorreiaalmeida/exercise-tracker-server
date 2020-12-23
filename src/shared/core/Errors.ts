export class HandledError {
  constructor(public readonly message: string) {}
}

export class ValidationError extends HandledError {
  constructor(public readonly message: string, public readonly field?: string) {
    super(message);
  }
}

export class ConflictError extends HandledError {
  constructor(public readonly message: string, public readonly field?: string) {
    super(message);
  }
}

export class ForbiddenError extends HandledError {
  constructor(public readonly message: string, public readonly field?: string) {
    super(message);
  }
}
