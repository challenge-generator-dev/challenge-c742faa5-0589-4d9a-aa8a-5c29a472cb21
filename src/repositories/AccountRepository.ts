import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
import { AccountDocument } from '../models/Account';

export class AccountRepository {
  private model: Model<AccountDocument>;

  constructor(accountModel: Model<AccountDocument>) {
    this.model = accountModel;
  }

  async findAll(): Promise<AccountDocument[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new Error(`Error al recuperar todas las cuentas: ${(error as Error).message}`);
    }
  }

  async findById(id: string): Promise<AccountDocument | null> {
    try {
      if (!id || id.trim() === '') {
        throw new Error('El ID de cuenta no puede estar vacío');
      }
      return await this.model.findById(id).exec();
    } catch (error) {
      if (error instanceof Error && error.message.includes('ID de cuenta')) {
        throw error;
      }
      throw new Error(`Error al buscar cuenta por ID: ${(error as Error).message}`);
    }
  }

  async findByClientId(clientId: string): Promise<AccountDocument[]> {
    try {
      if (!clientId || clientId.trim() === '') {
        throw new Error('El ID de cliente no puede estar vacío');
      }
      return await this.model.find({ clientId } as FilterQuery<AccountDocument>).exec();
    } catch (error) {
      if (error instanceof Error && error.message.includes('ID de cliente')) {
        throw error;
      }
      throw new Error(`Error al buscar cuentas por cliente: ${(error as Error).message}`);
    }
  }

  async create(accountData: Partial<AccountDocument>): Promise<AccountDocument> {
    try {
      if (!accountData.clientId) {
        throw new Error('El ID de cliente es obligatorio para crear una cuenta');
      }
      if (!accountData.type) {
        throw new Error('El tipo de cuenta es obligatorio');
      }
      if (accountData.balance === undefined || accountData.balance === null) {
        throw new Error('El saldo inicial es obligatorio');
      }
      const newAccount = new this.model(accountData);
      return await newAccount.save();
    } catch (error) {
      if (error instanceof Error && error.message.includes('obligatorio')) {
        throw error;
      }
      throw new Error(`Error al crear cuenta: ${(error as Error).message}`);
    }
  }

  async update(id: string, updateData: UpdateQuery<AccountDocument>): Promise<AccountDocument | null> {
    try {
      if (!id || id.trim() === '') {
        throw new Error('El ID de cuenta no puede estar vacío para actualizar');
      }
      return await this.model.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
    } catch (error) {
      if (error instanceof Error && error.message.includes('ID de cuenta')) {
        throw error;
      }
      throw new Error(`Error al actualizar cuenta: ${(error as Error).message}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      if (!id || id.trim() === '') {
        throw new Error('El ID de cuenta no puede estar vacío para eliminar');
      }
      const result = await this.model.findByIdAndDelete(id).exec();
      return result !== null;
    } catch (error) {
      if (error instanceof Error && error.message.includes('ID de cuenta')) {
        throw error;
      }
      throw new Error(`Error al eliminar cuenta: ${(error as Error).message}`);
    }
  }

  async findByType(type: string): Promise<AccountDocument[]> {
    try {
      if (!type || (type !== 'savings' && type !== 'checking')) {
        throw new Error('Tipo de cuenta inválido. Debe ser "savings" o "checking"');
      }
      return await this.model.find({ type } as FilterQuery<AccountDocument>).exec();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Tipo de cuenta')) {
        throw error;
      }
      throw new Error(`Error al buscar cuentas por tipo: ${(error as Error).message}`);
    }
  }

  async updateBalance(id: string, newBalance: number): Promise<AccountDocument | null> {
    try {
      if (!id || id.trim() === '') {
        throw new Error('El ID de cuenta no puede estar vacío');
      }
      if (typeof newBalance !== 'number' || isNaN(newBalance)) {
        throw new Error('El nuevo saldo debe ser un número válido');
      }
      return await this.model.findByIdAndUpdate(
        id,
        { balance: newBalance } as UpdateQuery<AccountDocument>,
        { new: true }
      ).exec();
    } catch (error) {
      if (error instanceof Error && (error.message.includes('ID de cuenta') || error.message.includes('nuevo saldo'))) {
        throw error;
      }
      throw new Error(`Error al actualizar saldo: ${(error as Error).message}`);
    }
  }
}