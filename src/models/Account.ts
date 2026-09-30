import mongoose, { Schema, Document } from 'mongoose';
import { ClientDocument } from './Client';

export type AccountType = 'savings' | 'checking';

export interface AccountDocument extends Document {
  accountNumber: string;
  client: ClientDocument['_id'];
  type: AccountType;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema: Schema = new Schema({
  accountNumber: {
    type: String,
    required: [true, 'El número de cuenta es obligatorio'],
    unique: true,
    trim: true,
    match: [/^[0-9]{10,20}$/, 'El número de cuenta debe contener entre 10 y 20 dígitos']
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'El cliente es obligatorio']
  },
  type: {
    type: String,
    enum: {
      values: ['savings', 'checking'],
      message: 'El tipo de cuenta debe ser 'savings' o 'checking''
    },
    required: [true, 'El tipo de cuenta es obligatorio']
  },
  balance: {
    type: Number,
    required: [true, 'El saldo inicial es obligatorio'],
    min: [0, 'El saldo no puede ser negativo']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar updatedAt antes de guardar
AccountSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Validación personalizada para balance inicial según tipo de cuenta
AccountSchema.path('balance').validate(function(value: number) {
  if (this.type === 'savings' && value < 10) {
    throw new Error('El saldo inicial para cuentas de ahorro debe ser al menos 10');
  }
  if (this.type === 'checking' && value < 50) {
    throw new Error('El saldo inicial para cuentas corrientes debe ser al menos 50');
  }
  return true;
});

export const Account = mongoose.model<AccountDocument>('Account', AccountSchema);
"