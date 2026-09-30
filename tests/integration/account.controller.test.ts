import request from 'supertest';
import { Express } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../../src/app';
import { Account } from '../../src/models/Account';
import { Client } from '../../src/models/Client';

describe.skip('AccountController - Integración', () => {
  let mongoServer: MongoMemoryServer;
  let expressApp: Express;
  let testClientId: string;
  let testAccountId: string;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    expressApp = app;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Account.deleteMany({});
    await Client.deleteMany({});

    const client = await Client.create({
      name: 'Test Client',
      email: 'test@example.com',
      type: 'individual',
      phone: '1234567890',
    });
    testClientId = client._id.toString();
  });

  describe('POST /api/accounts', () => {
    it('debería crear una cuenta de ahorros exitosamente', async () => {
      // Arrange
      const accountData = {
        clientId: testClientId,
        type: 'savings',
        initialBalance: 100,
      };

      // Act
      const response = await request(expressApp)
        .post('/api/accounts')
        .send(accountData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.type).toBe('savings');
      expect(response.body.balance).toBe(100);
    });

    it('debería retornar 400 para cuenta de ahorros con saldo menor a 10', async () => {
      // Arrange
      const accountData = {
        clientId: testClientId,
        type: 'savings',
        initialBalance: 5,
      };

      // Act
      const response = await request(expressApp)
        .post('/api/accounts')
        .send(accountData);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('debería retornar 400 para cuenta corriente con saldo menor a 50', async () => {
      // Arrange
      const accountData = {
        clientId: testClientId,
        type: 'checking',
        initialBalance: 20,
      };

      // Act
      const response = await request(expressApp)
        .post('/api/accounts')
        .send(accountData);

      // Assert
      expect(response.status).toBe(400);
    });

    it('debería retornar 404 si el cliente no existe', async () => {
      // Arrange
      const accountData = {
        clientId: 'nonexistent-client-id',
        type: 'savings',
        initialBalance: 100,
      };

      // Act
      const response = await request(expressApp)
        .post('/api/accounts')
        .send(accountData);

      // Assert
      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/accounts/:id', () => {
    it('debería obtener una cuenta por ID', async () => {
      // Arrange
      const account = await Account.create({
        clientId: testClientId,
        type: 'savings',
        balance: 100,
      });
      testAccountId = account._id.toString();

      // Act
      const response = await request(expressApp)
        .get(`/api/accounts/${testAccountId}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(testAccountId);
      expect(response.body.balance).toBe(100);
    });

    it('debería retornar 404 para cuenta inexistente', async () => {
      // Act
      const response = await request(expressApp)
        .get('/api/accounts/nonexistent-id');

      // Assert
      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/accounts/client/:clientId', () => {
    it('debería obtener todas las cuentas de un cliente', async () => {
      // Arrange
      await Account.create([
        { clientId: testClientId, type: 'savings', balance: 100 },
        { clientId: testClientId, type: 'checking', balance: 200 },
      ]);

      // Act
      const response = await request(expressApp)
        .get(`/api/accounts/client/${testClientId}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  describe('PUT /api/accounts/:id/deposit', () => {
    it('debería realizar un depósito exitoso', async () => {
      // Arrange
      const account = await Account.create({
        clientId: testClientId,
        type: 'savings',
        balance: 100,
      });
      testAccountId = account._id.toString();

      // Act
      const response = await request(expressApp)
        .put(`/api/accounts/${testAccountId}/deposit`)
        .send({ amount: 50 });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.balance).toBe(150);
    });

    it('debería retornar 400 para monto negativo', async () => {
      // Arrange
      const account = await Account.create({
        clientId: testClientId,
        type: 'savings',
        balance: 100,
      });
      testAccountId = account._id.toString();

      // Act
      const response = await request(expressApp)
        .put(`/api/accounts/${testAccountId}/deposit`)
        .send({ amount: -50 });

      // Assert
      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/accounts/:id/withdraw', () => {
    it('debería realizar un retiro exitoso', async () => {
      // Arrange
      const account = await Account.create({
        clientId: testClientId,
        type: 'savings',
        balance: 100,
      });
      testAccountId = account._id.toString();

      // Act
      const response = await request(expressApp)
        .put(`/api/accounts/${testAccountId}/withdraw`)
        .send({ amount: 30 });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.balance).toBe(70);
    });

    it('debería retornar 400 cuando el saldo es insuficiente', async () => {
      // Arrange
      const account = await Account.create({
        clientId: testClientId,
        type: 'savings',
        balance: 50,
      });
      testAccountId = account._id.toString();

      // Act
      const response = await request(expressApp)
        .put(`/api/accounts/${testAccountId}/withdraw`)
        .send({ amount: 100 });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('INSUFFICIENT_FUNDS');
    });
  });

  describe('DELETE /api/accounts/:id', () => {
    it('debería eliminar una cuenta exitosamente', async () => {
      // Arrange
      const account = await Account.create({
        clientId: testClientId,
        type: 'savings',
        balance: 100,
      });
      testAccountId = account._id.toString();

      // Act
      const response = await request(expressApp)
        .delete(`/api/accounts/${testAccountId}`);

      // Assert
      expect(response.status).toBe(204);

      const deletedAccount = await Account.findById(testAccountId);
      expect(deletedAccount).toBeNull();
    });

    it('debería retornar 404 al intentar eliminar cuenta inexistente', async () => {
      // Act
      const response = await request(expressApp)
        .delete('/api/accounts/nonexistent-id');

      // Assert
      expect(response.status).toBe(404);
    });
  });
});