import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bank-api';
const MONGODB_OPTIONS = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    const connection = await mongoose.connect(MONGODB_URI, MONGODB_OPTIONS);
    console.log('Conectado a MongoDB exitosamente');
    console.log(`Host: ${connection.connection.host}`);
    console.log(`Base de datos: ${connection.connection.name}`);
    console.log(`Puerto: ${connection.connection.port}`);
    return connection;
  } catch (error) {
    console.error('Error al conectar con MongoDB:', (error as Error).message);
    if ((error as Error).name === 'MongoServerSelectionError') {
      console.error('Verifica que el servidor de MongoDB esté ejecutándose');
    } else if ((error as Error).name === 'MongoNetworkError') {
      console.error('Error de red. Verifica la configuración de la URI de MongoDB');
    }
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB correctamente');
  } catch (error) {
    console.error('Error al desconectar de MongoDB:', (error as Error).message);
    throw error;
  }
}

export function getConnectionStatus(): string {
  const states = {
    [mongoose.ConnectionStates.Disconnected]: 'Desconectado',
    [mongoose.ConnectionStates.Connected]: 'Conectado',
    [mongoose.ConnectionStates.Connecting]: 'Conectando',
    [mongoose.ConnectionStates.Disconnecting]: 'Desconectando',
    [mongoose.ConnectionStates.Uninitialized]: 'No inicializado',
  };
  return states[mongoose.connection.readyState] || 'Desconocido';
}

mongoose.connection.on('connected', () => {
  console.log('Evento: Conexión a MongoDB establecida');
});

mongoose.connection.on('error', (err) => {
  console.error('Error en la conexión de MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Evento: Conexión a MongoDB cerrada');
});

mongoose.connection.on('reconnected', () => {
  console.log('Evento: Reconexión a MongoDB exitosa');
});

mongoose.connection.on('close', () => {
  console.log('Evento: Conexión a MongoDB cerrada completamente');
});

export default mongoose;