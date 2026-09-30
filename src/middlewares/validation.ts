import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from './errorHandler';

export const validationMiddleware = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: 'path' in err ? err.path : 'unknown',
        message: err.msg,
        value: 'path' in err ? (err as any).value : undefined,
      }));

      const errorMessage = formattedErrors
        .map((e) => `${e.field}: ${e.message}`)
        .join(', ');

      next(new ValidationError(errorMessage));
      return;
    }

    next();
  };
};

export const validateAccountCreation = [
  require('express-validator').body('clientId')
    .isString()
    .withMessage('El ID del cliente es requerido')
    .notEmpty()
    .withMessage('El ID del cliente no puede estar vacío'),
  
  require('express-validator').body('type')
    .isIn(['savings', 'checking'])
    .withMessage('El tipo de cuenta debe ser savings o checking'),
  
  require('express-validator').body('initialBalance')
    .isNumeric()
    .withMessage('El saldo inicial debe ser un número')
    .custom((value: number) => {
      if (value < 0) {
        throw new Error('El saldo inicial no puede ser negativo');
      }
      return true;
    }),
];

export const validateAccountUpdate = [
  require('express-validator').body('type')
    .optional()
    .isIn(['savings', 'checking'])
    .withMessage('El tipo de cuenta debe ser savings o checking'),
  
  require('express-validator').body('initialBalance')
    .optional()
    .isNumeric()
    .withMessage('El saldo inicial debe ser un número')
    .custom((value: number) => {
      if (value < 0) {
        throw new Error('El saldo inicial no puede ser negativo');
      }
      return true;
    }),
  
  require('express-validator').body('clientId')
    .optional()
    .isString()
    .withMessage('El ID del cliente debe ser un string')
    .notEmpty()
    .withMessage('El ID del cliente no puede estar vacío'),
];

export const validateObjectId = (paramName: string) => [
  require('express-validator').param(paramName)
    .isMongoId()
    .withMessage(`El ID de ${paramName} debe ser un ObjectId válido de MongoDB`),
];

export const validatePagination = [
  require('express-validator').query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número entero mayor a 0'),
  
  require('express-validator').query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un número entero entre 1 y 100'),
];