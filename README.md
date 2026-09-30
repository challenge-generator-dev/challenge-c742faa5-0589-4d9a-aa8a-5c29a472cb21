# Desarrollo de API REST en Node.js y Express

En un entorno de banca digital, se necesita desarrollar una API REST que maneje la gestión de cuentas de clientes. La API debe permitir la creación, lectura, actualización y eliminación de cuentas, así como la consulta del saldo. Los clientes pueden ser personas físicas o jurídicas, y cada cuenta debe tener un identificador único, un tipo de cuenta (ahorros o corriente), y un saldo inicial. La API debe manejar adecuadamente los errores y asegurar la integridad de los datos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Node.js Express |
| **Nivel** | junior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición del Modelo de Datos

**Objetivo:** Definir el modelo de datos para las cuentas de clientes, incluyendo los atributos necesarios y las relaciones entre ellos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Identificar los atributos necesarios para una cuenta de cliente (identificador único, tipo de cuenta, saldo inicial).
- Definir las relaciones entre las cuentas y los clientes (personas físicas o jurídicas).
- Establecer las restricciones y validaciones necesarias para asegurar la integridad de los datos.

**Entregable:** Modelo de datos para cuentas de clientes, incluyendo atributos y relaciones.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las diferentes necesidades de validación para cuentas de personas físicas y jurídicas.
- Piensa en cómo manejar los errores de validación y asegurar la consistencia de los datos.

</details>

### Fase 2: Implementación de Endpoints CRUD

**Objetivo:** Implementar los endpoints CRUD para la gestión de cuentas de clientes.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Crear los endpoints para crear, leer, actualizar y eliminar cuentas de clientes.
- Asegurar que los endpoints manejen adecuadamente los errores y devuelvan las respuestas correctas.
- Implementar la lógica necesaria para validar los datos de entrada y asegurar la integridad de los datos.

**Entregable:** Endpoints CRUD para la gestión de cuentas de clientes, con manejo de errores y validaciones.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo estructurar la lógica de los endpoints para asegurar la reutilización y mantenibilidad del código.
- Piensa en cómo manejar los casos de error y devolver las respuestas adecuadas al cliente.

</details>

### Fase 3: Pruebas y Optimización

**Objetivo:** Realizar pruebas unitarias y de integración para asegurar la calidad del código, y optimizar el rendimiento de los endpoints.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Escribir pruebas unitarias para los endpoints y la lógica de validación.
- Realizar pruebas de integración para asegurar la correcta interacción entre los endpoints y el modelo de datos.
- Identificar y optimizar los puntos de rendimiento crítico en los endpoints.

**Entregable:** Pruebas unitarias y de integración para los endpoints, y optimización del rendimiento.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo escribir pruebas efectivas que cubran los casos de uso más comunes y los edge cases.
- Piensa en cómo identificar y optimizar los puntos de rendimiento crítico en los endpoints.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un modelo de datos y por qué es importante en la gestión de cuentas de clientes?
- **paraQueSirve**: ¿Para qué sirven los endpoints CRUD en la gestión de cuentas de clientes?
- **comoSeUsa**: ¿Cómo se usa la lógica de validación en los endpoints para asegurar la integridad de los datos?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al implementar los endpoints CRUD y cómo se pueden manejar?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización del rendimiento de los endpoints y cómo se pueden tomar?

## Criterios de Evaluacion

- Definición correcta del modelo de datos para cuentas de clientes.
- Implementación efectiva de los endpoints CRUD con manejo de errores y validaciones.
- Realización de pruebas unitarias y de integración para asegurar la calidad del código.
- Optimización del rendimiento de los endpoints.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
