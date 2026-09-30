import { AccountRepository } from '../repositories/AccountRepository';
import { AccountDocument, AccountType } from '../models/Account';
import { CreateAccountDTO } from '../dto/CreateAccountDTO';

export class AccountService {
  private repository: AccountRepository;

  constructor(repository: AccountRepository) {
    this.repository = repository;
  }

  async getAllAccounts(): Promise<AccountDocument[]> {
    return await this.repository.findAll();
  }

  async getAccountById(id: string): Promise<AccountDocument> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de cuenta es requerido');
    }
    const account = await this.repository.findById(id);
    if (!account) {
      throw new Error(`Cuenta con ID ${id} no encontrada`);
    }
    return account;
  }

  async getAccountsByClientId(clientId: string): Promise<AccountDocument[]> {
    if (!clientId || clientId.trim() === '') {
      throw new Error('El ID de cliente es requerido');
    }
    return await this.repository.findByClientId(clientId);
  }

  async createAccount(dto: CreateAccountDTO): Promise<AccountDocument> {
    this.validateCreateAccountDTO(dto);
    const accountData = this.buildAccountData(dto);
    return await this.repository.create(accountData);
  }

  async updateAccount(id: string, updates: Partial<AccountDocument>): Promise<AccountDocument> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de cuenta es requerido para actualizar');
    }
    const existingAccount = await this.repository.findById(id);
    if (!existingAccount) {
      throw new Error(`Cuenta con ID ${id} no encontrada para actualizar`);
    }
    if (updates.balance !== undefined) {
      this.validateBalance(updates.balance, existingAccount.type as AccountType);
    }
    if (updates.type !== undefined) {
      this.validateAccountType(updates.type);
    }
    const updatedAccount = await this.repository.update(id, updates);
    if (!updatedAccount) {
      throw new Error(`Error al actualizar la cuenta con ID ${id}`);
    }
    return updatedAccount;
  }

  async deleteAccount(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de cuenta es requerido para eliminar');
    }
    const existingAccount = await this.repository.findById(id);
    if (!existingAccount) {
      throw new Error(`Cuenta con ID ${id} no encontrada para eliminar`);
    }
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Error al eliminar la cuenta con ID ${id}`);
    }
  }

  async getAccountsByType(type: string): Promise<AccountDocument[]> {
    this.validateAccountType(type);
    return await this.repository.findByType(type);
  }

  async updateAccountBalance(id: string, newBalance: number): Promise<AccountDocument> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de cuenta es requerido');
    }
    if (typeof newBalance !== 'number' || isNaN(newBalance)) {
      throw new Error('El nuevo saldo debe ser un número válido');
    }
    const account = await this.repository.findById(id);
    if (!account) {
      throw new Error(`Cuenta con ID ${id} no encontrada`);
    }
    this.validateBalance(newBalance, account.type as AccountType);
    const updatedAccount = await this.repository.updateBalance(id, newBalance);
    if (!updatedAccount) {
      throw new Error(`Error al actualizar el saldo de la cuenta ${id}`);
    }
    return updatedAccount;
  }

  private validateCreateAccountDTO(dto: CreateAccountDTO): void {
    if (!dto.clientId || dto.clientId.trim() === '') {
      throw new Error('El ID de cliente es obligatorio');
    }
    if (!dto.type) {
      throw new Error('El tipo de cuenta es obligatorio');
    }
    this.validateAccountType(dto.type);
    if (dto.balance === undefined || dto.balance === null) {
      throw new Error('El saldo inicial es obligatorio');
    }
    this.validateBalance(dto.balance, dto.type as AccountType);
  }

  private validateAccountType(type: string): void {
    const validTypes: AccountType[] = ['savings', 'checking'];
    if (!validTypes.includes(type as AccountType)) {
      throw new Error(`Tipo de cuenta inválido: ${type}. Debe ser "savings" o "checking"`);
    }
  }

  private validateBalance(balance: number, accountType: AccountType): void {
    if (typeof balance !== 'number' || isNaN(balance)) {
      throw new Error('El saldo debe ser un número válido');
    }
    if (balance < 0) {
      throw new Error('El saldo no puede ser negativo');
    }
    if (accountType === 'savings' && balance < 10) {
      throw new Error('El saldo mínimo para cuentas de ahorro es 10');
    }
    if (accountType === 'checking' && balance < 50) {
      throw new Error('El saldo mínimo para cuentas corrientes es 50');
    }
  }

  private buildAccountData(dto: CreateAccountDTO): Partial<AccountDocument> {
    return {
      clientId: dto.clientId,
      type: dto.type as AccountType,
      balance: dto.balance,
      status: dto.status || 'active',
    };
  }
}