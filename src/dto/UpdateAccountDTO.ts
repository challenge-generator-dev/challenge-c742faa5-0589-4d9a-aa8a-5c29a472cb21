import { body, param, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export type AccountType = 'savings' | 'checking';

export class UpdateAccountDTO {
  public readonly type?: AccountType;
  public readonly balance?: number;
  public readonly isActive?: boolean;
  public readonly clientId?: string;

  constructor(data: Partial<UpdateAccountDTO>) {
    this.type = data.type;
    this.balance = data.balance;
    this.isActive = data.isActive;
    this.clientId = data.clientId;
  }

  static validateBalance(type: string | undefined, value: number | undefined): boolean {
    if (value === undefined) return true;
    if (type === 'savings' && value < 10) return false;
    if (type === 'checking' && value < 50) return false;
    return true;
  }
}

export const updateAccountValidationRules: ValidationChain[] = [
  param('id')
    .isMongoId()
    .withMessage('El ID de cuenta debe ser un ID de MongoDB válido'),
  body('type')
    .optional()
    .isIn(['savings', 'checking'])
    .withMessage('El tipo de cuenta debe ser "savings" o "checking"'),
  body('balance')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El saldo debe ser un número positivo'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive debe ser un valor booleano'),
  body('clientId')
    .optional()
    .isMongoId()
    .withMessage('El ID de cliente debe ser un ID de MongoDB válido'),
];

export const validateUpdateAccount = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: 'path' in err ? err.path : 'unknown',
        message: err.msg,
      })),
    });
    return;
  }

  const { type, balance } = req.body;
  if (!UpdateAccountDTO.validateBalance(type, balance)) {
    if (type === 'savings') {
      res.status(400).json({
        success: false,
        errors: [{ field: 'balance', message: 'El saldo mínimo para cuentas de ahorro es 10' }],
      });
      return;
    }
    if (type === 'checking') {
      res.status(400).json({
        success: false,
        errors: [{ field: 'balance', message: 'El saldo mínimo para cuentas corrientes es 50' }],
      });
      return;
    }
  }

  next();
};