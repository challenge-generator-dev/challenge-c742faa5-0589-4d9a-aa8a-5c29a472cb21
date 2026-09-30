export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  INVALID_OPERATION = 'INVALID_OPERATION',
  DATABASE_ERROR = 'DATABASE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
}

export interface AppErrorOptions {
  message: string;
  code: ErrorCode;
  statusCode: number;
  details?: Record<string, unknown>;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;
  public readonly isOperational: boolean;

  constructor(options: AppErrorOptions) {
    super(options.message);
    this.name = this.constructor.name;
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.details = options.details;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details && { details: this.details }),
      },
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super({
      message,
      code: ErrorCode.VALIDATION_ERROR,
      statusCode: 400,
      details,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    super({
      message: `${resource}${identifier ? `: ${identifier}` : ''} no encontrado`,
      code: ErrorCode.NOT_FOUND,
      statusCode: 404,
    });
  }
}

export class DuplicateEntryError extends AppError {
  constructor(resource: string, field: string) {
    super({
      message: `El ${resource} con ese ${field} ya existe`,
      code: ErrorCode.DUPLICATE_ENTRY,
      statusCode: 409,
      details: { field },
    });
  }
}

export class InsufficientFundsError extends AppError {
  constructor(currentBalance: number, requestedAmount: number) {
    super({
      message: `Saldo insuficiente. Disponible: ${currentBalance}, Solicitado: ${requestedAmount}`,
      code: ErrorCode.INSUFFICIENT_FUNDS,
      statusCode: 400,
      details: { currentBalance, requestedAmount },
    });
  }
}

export class InvalidOperationError extends AppError {
  constructor(operation: string, reason: string) {
    super({
      message: `Operación inválida: ${operation}. Razón: ${reason}`,
      code: ErrorCode.INVALID_OPERATION,
      statusCode: 400,
      details: { operation, reason },
    });
  }
}

export class DatabaseError extends AppError {
  constructor(operation: string, originalError?: Error) {
    super({
      message: `Error de base de datos en operación: ${operation}`,
      code: ErrorCode.DATABASE_ERROR,
      statusCode: 500,
      details: { operation, originalError: originalError?.message },
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado') {
    super({
      message,
      code: ErrorCode.UNAUTHORIZED,
      statusCode: 401,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acceso prohibido') {
    super({
      message,
      code: ErrorCode.FORBIDDEN,
      statusCode: 403,
    });
  }
}