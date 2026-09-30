import mongoose, { Schema, Document } from 'mongoose';

export type ClientType = 'individual' | 'corporate';

export interface ClientDocument extends Document {
  identificationNumber: string;
  name: string;
  type: ClientType;
  email: string;
  phone: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema: Schema = new Schema({
  identificationNumber: {
    type: String,
    required: [true, 'El número de identificación es obligatorio'],
    unique: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9]{6,20}$/,
      'El número de identificación debe contener entre 6 y 20 caracteres alfanuméricos'
    ]
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  type: {
    type: String,
    enum: {
      values: ['individual', 'corporate'],
      message: 'El tipo de cliente debe ser 'individual' o 'corporate''
    },
    required: [true, 'El tipo de cliente es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
      'El email debe ser válido'
    ]
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true,
    match: [
      /^[0-9]{10,15}$/,
      'El teléfono debe contener entre 10 y 15 dígitos'
    ]
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, 'La dirección no puede exceder 200 caracteres']
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
ClientSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Client = mongoose.model<ClientDocument>('Client', ClientSchema);
"