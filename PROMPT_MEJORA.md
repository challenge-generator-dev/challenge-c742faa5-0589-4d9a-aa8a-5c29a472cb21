# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `tests/unit/account.service.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `tests/integration/account.controller.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/services/AccountService.ts` — `AccountType.includes`: Se invoca `includes` sobre `AccountType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/controllers/AccountController.ts` — `AccountService.getBalance`: Se invoca `getBalance` sobre `AccountService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `tests/unit/account.service.test.ts` — `AccountService.deposit`: Se invoca `deposit` sobre `AccountService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `tests/unit/account.service.test.ts` — `AccountService.withdraw`: Se invoca `withdraw` sobre `AccountService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Contexto técnico original
Construir una API REST con Node.js, Express y MongoDB

### Reto
- Tema: Node.js Express
- Seniority: junior-l2
- Tipo: practical
- Título: Desarrollo de API REST en Node.js y Express
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición del Modelo de Datos — objetivo: Definir el modelo de datos para las cuentas de clientes, incluyendo los atributos necesarios y las relaciones entre ellos. — entregable (NO resolver): Modelo de datos para cuentas de clientes, incluyendo atributos y relaciones.
- Fase 2: Implementación de Endpoints CRUD — objetivo: Implementar los endpoints CRUD para la gestión de cuentas de clientes. — entregable (NO resolver): Endpoints CRUD para la gestión de cuentas de clientes, con manejo de errores y validaciones.
- Fase 3: Pruebas y Optimización — objetivo: Realizar pruebas unitarias y de integración para asegurar la calidad del código, y optimizar el rendimiento de los endpoints. — entregable (NO resolver): Pruebas unitarias y de integración para los endpoints, y optimización del rendimiento.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "tests"]
}

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: package.json ===
{
  "name": "bank-api",
  "version": "1.0.0",
  "description": "API REST para gestión de cuentas bancarias",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "test:watch": "jest --watch"
  },
  "keywords": ["express", "typescript", "bank", "api"],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "4.18.2",
    "mongoose": "8.0.3",
    "express-validator": "7.0.1",
    "dotenv": "16.3.1"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/node": "20.12.2",
    "typescript": "5.3.3",
    "jest": "29.7.0",
    "@types/jest": "29.5.12",
    "ts-jest": "29.1.2",
    "supertest": "6.3.4",
    "@types/supertest": "2.0.16",
    "mongodb-memory-server": "9.1.6"
  }
}

// === ARCHIVO: src/models/Account.ts ===
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

// === ARCHIVO: src/models/Client.ts ===
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

// === ARCHIVO: src/dto/CreateAccountDTO.ts ===
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

// === ARCHIVO: src/app.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import accountRoutes from './controllers/AccountController';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/accounts', accountRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;

// === ARCHIVO: src/app.module.ts ===
import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './controllers/AccountController';
import { AccountService } from './services/AccountService';
import { AccountRepository } from './repositories/AccountRepository';
import { Account, AccountSchema } from './models/Account';
import { Client, ClientSchema } from './models/Client';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/bank-api'),
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Client.name, schema: ClientSchema },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountService, AccountRepository],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    console.log('Módulo de aplicación inicializado');
  }

  onModuleDestroy() {
    console.log('Módulo de aplicación destruido');
  }
}

// === ARCHIVO: src/dto/UpdateAccountDTO.ts ===
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

// === ARCHIVO: src/repositories/AccountRepository.ts ===
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

// === ARCHIVO: src/config/db.ts ===
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

// === ARCHIVO: src/services/AccountService.ts ===
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

// === ARCHIVO: src/controllers/AccountController.ts ===
import { Request, Response, NextFunction, Router } from 'express';
import { AccountService } from '../services/AccountService';
import { CreateAccountDTO } from '../dto/CreateAccountDTO';
import { UpdateAccountDTO } from '../dto/UpdateAccountDTO';
import { validationMiddleware } from '../middlewares/validation';

const router = Router();

export class AccountController {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
    this.initRoutes();
  }

  private initRoutes(): void {
    router.get('/', this.getAllAccounts.bind(this));
    router.get('/:id', this.getAccountById.bind(this));
    router.post('/', validationMiddleware(CreateAccountDTO), this.createAccount.bind(this));
    router.put('/:id', validationMiddleware(UpdateAccountDTO), this.updateAccount.bind(this));
    router.delete('/:id', this.deleteAccount.bind(this));
    router.get('/:id/balance', this.getBalance.bind(this));
  }

  public getRouter(): Router {
    return router;
  }

  private async getAllAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const clientId = req.query.clientId as string | undefined;

      const accounts = await this.accountService.getAllAccounts(page, limit, clientId);
      res.status(200).json({
        success: true,
        data: accounts,
        pagination: {
          page,
          limit,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  private async getAccountById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const account = await this.accountService.getAccountById(id);

      if (!account) {
        res.status(404).json({
          success: false,
          message: 'Cuenta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: account,
      });
    } catch (error) {
      next(error);
    }
  }

  private async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountData: CreateAccountDTO = req.body;
      const newAccount = await this.accountService.createAccount(accountData);

      res.status(201).json({
        success: true,
        message: 'Cuenta creada exitosamente',
        data: newAccount,
      });
    } catch (error) {
      next(error);
    }
  }

  private async updateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateAccountDTO = req.body;

      const updatedAccount = await this.accountService.updateAccount(id, updateData);

      if (!updatedAccount) {
        res.status(404).json({
          success: false,
          message: 'Cuenta no encontrada para actualizar',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Cuenta actualizada exitosamente',
        data: updatedAccount,
      });
    } catch (error) {
      next(error);
    }
  }

  private async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.accountService.deleteAccount(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Cuenta no encontrada para eliminar',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Cuenta eliminada exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }

  private async getBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const balance = await this.accountService.getBalance(id);

      if (balance === null) {
        res.status(404).json({
          success: false,
          message: 'Cuenta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          accountId: id,
          balance,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

// === ARCHIVO: src/middlewares/errorHandler.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

export class AppError extends Error implements AppError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code || 'INTERNAL_ERROR';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} no encontrado`, 404, 'NOT_FOUND');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export classConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT_ERROR');
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'No autorizado') {
    super(message, 401, 'UNAUTHORIZED');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Error interno del servidor';

  console.error(`[Error] ${err.code || 'UNKNOWN'}: ${err.message}`);
  console.error('Stack:', err.stack);

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      success: false,
      statusCode,
      code: err.code || 'ERROR',
      message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(statusCode).json({
      success: false,
      statusCode,
      code: err.code || 'ERROR',
      message,
      timestamp: new Date().toISOString(),
    });
  }
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    code: 'NOT_FOUND',
    message: `Ruta ${req.originalUrl} no encontrada`,
    timestamp: new Date().toISOString(),
  });
};

// === ARCHIVO: src/middlewares/validation.ts ===
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from './errorHandler';

export const validationMiddleware = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: 'path' in err ? err.path : 'unknown',
        message: err.msg,
        value: 'path' in err ? (err as any).value : undefined,
      }));

      const errorMessage = formattedErrors
        .map((e) => `${e.field}: ${e.message}`)
        .join(', ');

      next(new ValidationError(errorMessage));
      return;
    }

    next();
  };
};

export const validateAccountCreation = [
  require('express-validator').body('clientId')
    .isString()
    .withMessage('El ID del cliente es requerido')
    .notEmpty()
    .withMessage('El ID del cliente no puede estar vacío'),
  
  require('express-validator').body('type')
    .isIn(['savings', 'checking'])
    .withMessage('El tipo de cuenta debe ser savings o checking'),
  
  require('express-validator').body('initialBalance')
    .isNumeric()
    .withMessage('El saldo inicial debe ser un número')
    .custom((value: number) => {
      if (value < 0) {
        throw new Error('El saldo inicial no puede ser negativo');
      }
      return true;
    }),
];

export const validateAccountUpdate = [
  require('express-validator').body('type')
    .optional()
    .isIn(['savings', 'checking'])
    .withMessage('El tipo de cuenta debe ser savings o checking'),
  
  require('express-validator').body('initialBalance')
    .optional()
    .isNumeric()
    .withMessage('El saldo inicial debe ser un número')
    .custom((value: number) => {
      if (value < 0) {
        throw new Error('El saldo inicial no puede ser negativo');
      }
      return true;
    }),
  
  require('express-validator').body('clientId')
    .optional()
    .isString()
    .withMessage('El ID del cliente debe ser un string')
    .notEmpty()
    .withMessage('El ID del cliente no puede estar vacío'),
];

export const validateObjectId = (paramName: string) => [
  require('express-validator').param(paramName)
    .isMongoId()
    .withMessage(`El ID de ${paramName} debe ser un ObjectId válido de MongoDB`),
];

export const validatePagination = [
  require('express-validator').query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número entero mayor a 0'),
  
  require('express-validator').query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un número entero entre 1 y 100'),
];

// === ARCHIVO: src/utils/errorTypes.ts ===
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  INVALID_OPERATION = 'INVALID_OPERATION',
  DATABASE_ERROR = 'DATABASE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
}

export interface AppErrorOptions {
  message: string;
  code: ErrorCode;
  statusCode: number;
  details?: Record<string, unknown>;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;
  public readonly isOperational: boolean;

  constructor(options: AppErrorOptions) {
    super(options.message);
    this.name = this.constructor.name;
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.details = options.details;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details && { details: this.details }),
      },
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super({
      message,
      code: ErrorCode.VALIDATION_ERROR,
      statusCode: 400,
      details,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    super({
      message: `${resource}${identifier ? `: ${identifier}` : ''} no encontrado`,
      code: ErrorCode.NOT_FOUND,
      statusCode: 404,
    });
  }
}

export class DuplicateEntryError extends AppError {
  constructor(resource: string, field: string) {
    super({
      message: `El ${resource} con ese ${field} ya existe`,
      code: ErrorCode.DUPLICATE_ENTRY,
      statusCode: 409,
      details: { field },
    });
  }
}

export class InsufficientFundsError extends AppError {
  constructor(currentBalance: number, requestedAmount: number) {
    super({
      message: `Saldo insuficiente. Disponible: ${currentBalance}, Solicitado: ${requestedAmount}`,
      code: ErrorCode.INSUFFICIENT_FUNDS,
      statusCode: 400,
      details: { currentBalance, requestedAmount },
    });
  }
}

export class InvalidOperationError extends AppError {
  constructor(operation: string, reason: string) {
    super({
      message: `Operación inválida: ${operation}. Razón: ${reason}`,
      code: ErrorCode.INVALID_OPERATION,
      statusCode: 400,
      details: { operation, reason },
    });
  }
}

export class DatabaseError extends AppError {
  constructor(operation: string, originalError?: Error) {
    super({
      message: `Error de base de datos en operación: ${operation}`,
      code: ErrorCode.DATABASE_ERROR,
      statusCode: 500,
      details: { operation, originalError: originalError?.message },
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado') {
    super({
      message,
      code: ErrorCode.UNAUTHORIZED,
      statusCode: 401,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acceso prohibido') {
    super({
      message,
      code: ErrorCode.FORBIDDEN,
      statusCode: 403,
    });
  }
}

// === ARCHIVO: tests/unit/account.service.test.ts ===
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

// === ARCHIVO: tests/integration/account.controller.test.ts ===
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

// === ARCHIVO: README.md ===
# Bank API

API REST para gestión de cuentas bancarias desarrollada con Node.js, Express y TypeScript.

## Descripción

Esta API permite gestionar cuentas de clientes en un entorno de banca digital. Soporta:
- Creación, lectura, actualización y eliminación de cuentas
- Consulta de saldo
- Dos tipos de cuenta: ahorros y corriente
- Clientes individuales y corporativos
- Validación de datos y manejo centralizado de errores

## Requisitos Previos

- Node.js 20.x o superior
- MongoDB 6.x (local o remoto)
- npm o yarn

## Instalación

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build
```

## Ejecución

```bash
# Modo desarrollo (con ts-node)
npm run dev

# Modo producción (compilado)
npm start
```

El servidor arrancará en el puerto especificado en la variable de entorno PORT (por defecto 3000).

## Estructura del Proyecto

```
bank-api/
├── src/
│   ├── config/          # Configuración de base de datos
│   ├── controllers/     # Controladores HTTP
│   ├── dto/             # Data Transfer Objects
│   ├── middlewares/     # Middlewares Express
│   ├── models/          # Modelos Mongoose
│   ├── repositories/    # Capa de acceso a datos
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades
│   ├── app.ts           # Configuración de Express
│   ├── app.module.ts    # Módulo principal
│   └── main.ts          # Punto de entrada
├── tests/
│   ├── unit/            # Pruebas unitarias
│   └── integration/     # Pruebas de integración
├── package.json
├── tsconfig.json
└── README.md
```

## Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/accounts | Crear cuenta |
| GET | /api/accounts | Listar cuentas |
| GET | /api/accounts/:id | Obtener cuenta por ID |
| PUT | /api/accounts/:id | Actualizar cuenta |
| DELETE | /api/accounts/:id | Eliminar cuenta |

## Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bankapi
NODE_ENV=development
```

## Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Pruebas unitarias únicamente
npm run test:unit

# Pruebas de integración únicamente
npm run test:integration

# Pruebas en modo watch
npm run test:watch
```

Las pruebas de integración utilizan MongoDB Memory Server para ejecutar tests sin necesidad de una base de datos real.

## Tecnologías

- **Runtime**: Node.js 20.x
- **Framework**: Express 4.18.2
- **Lenguaje**: TypeScript 5.3.3
- **Base de Datos**: MongoDB con Mongoose 8.0.3
- **Validación**: express-validator 7.0.1
- **Testing**: Jest 29.7.0 con ts-jest

## Convenciones de Código

- TypeScript con strict mode habilitado
- Separación de responsabilidades: controllers (HTTP), services (lógica), repositories (datos)
- Validación de DTOs con express-validator
- Manejo centralizado de errores con middlewares
- Pruebas unitarias con mocks, integración con base de datos en memoria
```
