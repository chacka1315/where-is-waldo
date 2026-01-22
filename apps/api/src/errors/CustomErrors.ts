export class BadRequestError extends Error {
  readonly statusCode = 400;
  constructor(message: string) {
    super(message);
    this.name = 'Bad_Request_Error';
  }
}

export class UnauthorizedError extends Error {
  readonly statusCode = 401;
  constructor(message: string) {
    super(message);
    this.name = 'Unauthorized_Error';
  }
}

export class ForbiddenError extends Error {
  readonly statusCode = 403;
  constructor(message: string) {
    super(message);
    this.name = 'Forbidden_Error';
  }
}

export class NotFoundError extends Error {
  readonly statusCode = 404;
  constructor(message: string = 'This page does not exist!') {
    super(message);
    this.name = 'Not_Found_Error';
  }
}

export class CustomMulterError {
  #messages: Record<string, string> = {
    LIMIT_PART_COUNT: 'Too many parts in the request.',
    LIMIT_FILE_SIZE: 'One or more uploaded file is too large.',
    LIMIT_FILE_COUNT: 'Too many files sent in the one request',
    LIMIT_FIELD_KEY: 'The field name is too long.',
    LIMIT_FIELD_VALUE: 'Field value too long',
    LIMIT_FIELD_COUNT: 'Too many form fields were sent.',
    LIMIT_UNEXPECTED_FILE: 'Unexpected file field detected.',
    MISSING_FIELD_NAME: 'Field name missing',
    UNKNOWN_ERR: 'Unknown error occurred during file upload, try later.',
  };

  readonly statusCode = 422;
  public message: string;
  constructor(errCode: string) {
    this.message = this.#messages[errCode] || this.#messages.UNKNOWN_ERR;
  }
}
