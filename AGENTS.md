# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Desarrollo de API REST en Node.js y Express**.

| | |
|---|---|
| Tema | Node.js Express |
| Nivel | junior-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / Express 4.18.2 |
| Patron arquitectonico | capas estándar (controller-service-repository) |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.0`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- express 4.18.2
- mongoose 8.0.3
- express-validator 7.0.1
- dotenv 16.3.1
- @types/express 4.17.21
- @types/node 20.12.2
- typescript 5.3.3
- jest 29.7.0
- @types/jest 29.5.12
- ts-jest 29.1.2
- supertest 6.3.4
- @types/supertest 2.0.16
- mongodb-memory-server 9.1.6

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Definición del Modelo de Datos**: Modelo de datos para cuentas de clientes, incluyendo atributos y relaciones.
- **Fase 2 — Implementación de Endpoints CRUD**: Endpoints CRUD para la gestión de cuentas de clientes, con manejo de errores y validaciones.
- **Fase 3 — Pruebas y Optimización**: Pruebas unitarias y de integración para los endpoints, y optimización del rendimiento.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `tests/unit/account.service.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `tests/integration/account.controller.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Referencias colgando (4)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/services/AccountService.ts` — `AccountType.includes`
      Se invoca `includes` sobre `AccountType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/controllers/AccountController.ts` — `AccountService.getBalance`
      Se invoca `getBalance` sobre `AccountService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `tests/unit/account.service.test.ts` — `AccountService.deposit`
      Se invoca `deposit` sobre `AccountService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `tests/unit/account.service.test.ts` — `AccountService.withdraw`
      Se invoca `withdraw` sobre `AccountService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (19)

- `tsconfig.json`
- `src/main.ts`
- `package.json`
- `src/models/Account.ts`
- `src/models/Client.ts`
- `src/dto/CreateAccountDTO.ts`
- `src/app.ts`
- `src/app.module.ts`
- `src/dto/UpdateAccountDTO.ts`
- `src/repositories/AccountRepository.ts`
- `src/config/db.ts`
- `src/services/AccountService.ts`
- `src/controllers/AccountController.ts`
- `src/middlewares/errorHandler.ts`
- `src/middlewares/validation.ts`
- `src/utils/errorTypes.ts`
- `tests/unit/account.service.test.ts`
- `tests/integration/account.controller.test.ts`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/controllers`
- `src/services`
- `src/repositories`
- `src/models`
- `src/dto`
- `src/middlewares`
- `src/utils`
- `src/config`
- `tests/unit`
- `tests/integration`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar (controller-service-repository)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Brecha que el reto ataca: Construir una API REST con Node.js, Express y MongoDB

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
