import { IsString, IsNotEmpty, IsEnum, IsNumber, Min, IsMongoId, Matches } from 'express-validator';

export class CreateAccountDTO {
  @IsString({ message: 'El número de cuenta debe ser un texto' })
  @IsNotEmpty({ message: 'El número de cuenta es obligatorio' })
  @Matches(/^[0-9]{10,20}$/, {
    message: 'El número de cuenta debe contener entre 10 y 20 dígitos'
  })
  accountNumber: string;

  @IsMongoId({ message: 'El ID del cliente debe ser un MongoID válido' })
  @IsNotEmpty({ message: 'El cliente es obligatorio' })
  client: string;

  @IsString({ message: 'El tipo de cuenta debe ser un texto' })
  @IsEnum(['savings', 'checking'], {
    message: 'El tipo de cuenta debe ser 'savings' o 'checking''
  })
  @IsNotEmpty({ message: 'El tipo de cuenta es obligatorio' })
  type: 'savings' | 'checking';

  @IsNumber({}, { message: 'El saldo inicial debe ser un número' })
  @Min(0, { message: 'El saldo no puede ser negativo' })
  @IsNotEmpty({ message: 'El saldo inicial es obligatorio' })
  balance: number;
}

// Validaciones condicionales para el saldo inicial según tipo de cuenta
export const validateAccountBalance = (value: number, { req }: any) => {
  const type = req.body.type;
  if (type === 'savings' && value < 10) {
    throw new Error('El saldo inicial para cuentas de ahorro debe ser al menos 10');
  }
  if (type === 'checking' && value < 50) {
    throw new Error('El saldo inicial para cuentas corrientes debe ser al menos 50');
  }
  return true;
};