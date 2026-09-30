import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import { AccountController } from './controllers/AccountController';

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bank_db')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Rutas
const accountController = new AccountController();
app.post('/accounts', accountController.createAccount.bind(accountController));
app.get('/accounts/:id', accountController.getAccount.bind(accountController));
app.put('/accounts/:id', accountController.updateAccount.bind(accountController));
app.delete('/accounts/:id', accountController.deleteAccount.bind(accountController));
app.get('/accounts/:id/balance', accountController.getBalance.bind(accountController));

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exportar la aplicación para pruebas
export default app;