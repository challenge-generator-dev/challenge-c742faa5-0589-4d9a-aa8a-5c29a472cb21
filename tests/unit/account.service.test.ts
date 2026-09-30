import { Test, TestingModule } from '@jest/describe';
import { AccountService } from '../../src/services/AccountService';
import { AccountRepository } from '../../src/repositories/AccountRepository';
import { AccountType } from '../../src/models/Account';
import { ValidationError, NotFoundError, InsufficientFundsError } from '../../src/utils/errorTypes';

describe.skip('AccountService', () => {
  let service: AccountService;
  let mockRepository: jest.Mocked<AccountRepository>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByClientId: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      updateBalance: jest.fn(),
    } as unknown as jest.Mocked<AccountRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: AccountRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  describe('createAccount', () => {
    it('debería crear una cuenta de ahorros con saldo válido', async () => {
      // Arrange
      const mockAccountData = {
        clientId: 'client123',
        type: 'savings' as AccountType,
        initialBalance: 100,
      };
      const mockCreatedAccount = {
        _id: 'account123',
        clientId: 'client123',
        type: 'savings',
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepository.create.mockResolvedValue(mockCreatedAccount as any);

      // Act
      const result = await service.createAccount(mockAccountData);

      // Assert
      expect(result).toEqual(mockCreatedAccount);
      expect(mockRepository.create).toHaveBeenCalledWith(mockAccountData);
    });

    it('debería lanzar ValidationError para cuenta de ahorros con saldo menor a 10', async () => {
      // Arrange
      const mockAccountData = {
        clientId: 'client123',
        type: 'savings' as AccountType,
        initialBalance: 5,
      };

      // Act & Assert
      await expect(service.createAccount(mockAccountData)).rejects.toThrow(ValidationError);
    });

    it('debería lanzar ValidationError para cuenta corriente con saldo menor a 50', async () => {
      // Arrange
      const mockAccountData = {
        clientId: 'client123',
        type: 'checking' as AccountType,
        initialBalance: 20,
      };

      // Act & Assert
      await expect(service.createAccount(mockAccountData)).rejects.toThrow(ValidationError);
    });
  });

  describe('getAccountById', () => {
    it('debería retornar una cuenta por su ID', async () => {
      // Arrange
      const mockAccount = {
        _id: 'account123',
        clientId: 'client123',
        type: 'savings' as AccountType,
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepository.findById.mockResolvedValue(mockAccount as any);

      // Act
      const result = await service.getAccountById('account123');

      // Assert
      expect(result).toEqual(mockAccount);
    });

    it('debería lanzar NotFoundError si la cuenta no existe', async () => {
      // Arrange
      mockRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getAccountById('nonexistent')).rejects.toThrow(NotFoundError);
    });
  });

  describe('deposit', () => {
    it('debería incrementar el saldo de la cuenta', async () => {
      // Arrange
      const accountId = 'account123';
      const amount = 50;
      const mockAccount = {
        _id: accountId,
        clientId: 'client123',
        type: 'savings' as AccountType,
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedAccount = { ...mockAccount, balance: 150 };
      mockRepository.findById.mockResolvedValue(mockAccount as any);
      mockRepository.updateBalance.mockResolvedValue(updatedAccount as any);

      // Act
      const result = await service.deposit(accountId, amount);

      // Assert
      expect(result.balance).toBe(150);
      expect(mockRepository.updateBalance).toHaveBeenCalledWith(accountId, 150);
    });

    it('debería lanzar error para monto negativo', async () => {
      // Arrange
      const accountId = 'account123';
      const amount = -50;

      // Act & Assert
      await expect(service.deposit(accountId, amount)).rejects.toThrow(ValidationError);
    });
  });

  describe('withdraw', () => {
    it('debería decrementar el saldo de la cuenta si hay fondos suficientes', async () => {
      // Arrange
      const accountId = 'account123';
      const amount = 30;
      const mockAccount = {
        _id: accountId,
        clientId: 'client123',
        type: 'savings' as AccountType,
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedAccount = { ...mockAccount, balance: 70 };
      mockRepository.findById.mockResolvedValue(mockAccount as any);
      mockRepository.updateBalance.mockResolvedValue(updatedAccount as any);

      // Act
      const result = await service.withdraw(accountId, amount);

      // Assert
      expect(result.balance).toBe(70);
    });

    it('debería lanzar InsufficientFundsError si el saldo es insuficiente', async () => {
      // Arrange
      const accountId = 'account123';
      const amount = 150;
      const mockAccount = {
        _id: accountId,
        clientId: 'client123',
        type: 'savings' as AccountType,
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepository.findById.mockResolvedValue(mockAccount as any);

      // Act & Assert
      await expect(service.withdraw(accountId, amount)).rejects.toThrow(InsufficientFundsError);
    });
  });

  describe('getAccountsByClientId', () => {
    it('debería retornar todas las cuentas de un cliente', async () => {
      // Arrange
      const clientId = 'client123';
      const mockAccounts = [
        { _id: 'account1', clientId, type: 'savings' as AccountType, balance: 100 },
        { _id: 'account2', clientId, type: 'checking' as AccountType, balance: 200 },
      ];
      mockRepository.findByClientId.mockResolvedValue(mockAccounts as any);

      // Act
      const result = await service.getAccountsByClientId(clientId);

      // Assert
      expect(result).toHaveLength(2);
    });
  });

  describe('deleteAccount', () => {
    it('debería eliminar una cuenta existente', async () => {
      // Arrange
      const accountId = 'account123';
      mockRepository.findById.mockResolvedValue({ _id: accountId } as any);
      mockRepository.delete.mockResolvedValue(true);

      // Act
      await service.deleteAccount(accountId);

      // Assert
      expect(mockRepository.delete).toHaveBeenCalledWith(accountId);
    });

    it('debería lanzar NotFoundError si la cuenta no existe', async () => {
      // Arrange
      mockRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.deleteAccount('nonexistent')).rejects.toThrow(NotFoundError);
    });
  });
});