# 📚 Biblioteca API

API REST para la gestión de una biblioteca, desarrollada como proyecto académico para la asignatura de **Programación III**.

El proyecto está construido utilizando **Node.js, Express, TypeScript y MongoDB**, implementando una arquitectura modular y separando las responsabilidades de la aplicación mediante capas.

---

# 🚀 Tecnologías

* Node.js
* Express 5
* TypeScript
* MongoDB
* MongoDB Driver
* Swagger / OpenAPI
* dotenv
* Git / GitHub

---

# 🏗️ Arquitectura

El proyecto utiliza una arquitectura por capas y módulos:

```text
Routes
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MongoDB
```

Cada capa tiene una responsabilidad específica:

* **Routes:** Define los endpoints disponibles de la API.
* **Controller:** Recibe las peticiones HTTP y construye las respuestas.
* **Service:** Contiene la lógica de negocio y las validaciones.
* **Repository:** Se encarga de la comunicación con MongoDB.
* **MongoDB:** Almacena la información de la aplicación.

Esta separación permite mantener el código organizado, reutilizable y fácil de mantener.

---

# 📁 Estructura del proyecto

```text
biblioteca-api/
│
├── node_modules/
│
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── authors/
│   │       ├── books/
│   │       ├── loans/
│   │       ├── users/
│   │       └── index.ts
│   │
│   ├── config/
│   │   └── database.ts
│   │
│   ├── shared/
│   │   ├── errors/
│   │   └── middlewares/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

> La estructura puede variar ligeramente dependiendo de la organización final del proyecto.

---

# 📚 Módulos

La API está dividida en cuatro módulos principales:

* 👨‍💻 Autores
* 📖 Libros
* 👤 Usuarios
* 📋 Préstamos

---

# 👨‍💻 Autores

Permite gestionar los autores registrados en la biblioteca.

## Endpoints

| Método | Ruta                        | Descripción                    |
| ------ | --------------------------- | ------------------------------ |
| POST   | `/api/v1/authors`           | Crear un autor                 |
| GET    | `/api/v1/authors`           | Obtener todos los autores      |
| GET    | `/api/v1/authors/:id`       | Obtener un autor por ID        |
| GET    | `/api/v1/authors/:id/books` | Obtener los libros de un autor |
| PUT    | `/api/v1/authors/:id`       | Actualizar un autor            |
| DELETE | `/api/v1/authors/:id`       | Eliminar un autor              |

### Información del autor

Los autores pueden estar relacionados con múltiples libros.

```text
Autor
  │
  ├── Libro 1
  ├── Libro 2
  └── Libro 3
```

---

# 📖 Libros

Permite administrar los libros registrados en la biblioteca y su relación con los autores.

## Endpoints

| Método | Ruta                | Descripción              |
| ------ | ------------------- | ------------------------ |
| POST   | `/api/v1/books`     | Crear un libro           |
| GET    | `/api/v1/books`     | Obtener todos los libros |
| GET    | `/api/v1/books/:id` | Obtener un libro por ID  |
| PUT    | `/api/v1/books/:id` | Actualizar un libro      |
| DELETE | `/api/v1/books/:id` | Eliminar un libro        |

Los libros contienen información relacionada con su autor y cuentan con un campo de disponibilidad utilizado por el sistema de préstamos.

---

# 👤 Usuarios

Permite administrar las personas registradas en la biblioteca.

## Endpoints

| Método | Ruta                | Descripción                |
| ------ | ------------------- | -------------------------- |
| POST   | `/api/v1/users`     | Crear un usuario           |
| GET    | `/api/v1/users`     | Obtener todos los usuarios |
| GET    | `/api/v1/users/:id` | Obtener un usuario por ID  |
| PUT    | `/api/v1/users/:id` | Actualizar un usuario      |
| DELETE | `/api/v1/users/:id` | Eliminar un usuario        |

## Datos del usuario

Un usuario contiene:

```json
{
  "name": "Juan Pérez",
  "email": "juan@gmail.com",
  "phone": "3001234567"
}
```

El sistema valida que:

* El nombre sea obligatorio.
* El correo sea obligatorio y tenga un formato válido.
* El teléfono sea obligatorio.
* No existan usuarios registrados con el mismo correo.

---

# 📋 Préstamos

Permite gestionar los préstamos y devoluciones de libros.

Los préstamos relacionan un **usuario** con un **libro** mediante sus respectivos identificadores de MongoDB.

## Endpoints

| Método | Ruta                       | Descripción                 |
| ------ | -------------------------- | --------------------------- |
| POST   | `/api/v1/loans`            | Crear un préstamo           |
| GET    | `/api/v1/loans`            | Obtener todos los préstamos |
| GET    | `/api/v1/loans/:id`        | Obtener un préstamo por ID  |
| PUT    | `/api/v1/loans/:id/return` | Registrar devolución        |
| DELETE | `/api/v1/loans/:id`        | Eliminar un préstamo        |

## Crear un préstamo

Para crear un préstamo se debe proporcionar el ID del usuario y el ID del libro:

```json
{
  "userId": "68d4a123456789abcdef1234",
  "bookId": "68d4b987654321abcdef5678"
}
```

El sistema realiza las siguientes validaciones:

1. Comprueba que el `userId` tenga un formato válido.
2. Comprueba que el usuario exista.
3. Comprueba que el `bookId` tenga un formato válido.
4. Comprueba que el libro exista.
5. Comprueba que el libro esté disponible.
6. Crea el préstamo.
7. Cambia el estado del libro a no disponible.

Cuando se registra la devolución:

```http
PUT /api/v1/loans/:id/return
```

el libro vuelve a estar disponible.

---

# 🔗 Relaciones entre entidades

La API maneja relaciones entre autores, libros, usuarios y préstamos.

```text
Autor
  │
  └── Libros
        │
        └── Préstamos
              │
              └── Usuario
```

De manera más detallada:

```text
┌─────────────┐
│    Autor    │
└──────┬──────┘
       │
       │ authorId
       ▼
┌─────────────┐
│    Libro    │
└──────┬──────┘
       │
       │ bookId
       ▼
┌─────────────┐
│   Préstamo  │
└──────┬──────┘
       │
       │ userId
       ▼
┌─────────────┐
│   Usuario   │
└─────────────┘
```

### Relaciones principales

* Un **autor** puede tener varios libros.
* Un **libro** pertenece a un autor.
* Un **usuario** puede realizar varios préstamos.
* Un **préstamo** pertenece a un usuario.
* Un **préstamo** corresponde a un libro.
* Un libro puede estar disponible o no disponible dependiendo de sus préstamos activos.

La aplicación implementa validaciones y reglas de negocio para mantener la integridad de estas relaciones.

---

# 📑 Documentación de la API

La API cuenta con documentación mediante **Swagger / OpenAPI**.

Con el servidor ejecutándose, puedes acceder a:

```text
http://localhost:3000/api-docs/
```

Desde Swagger UI puedes consultar y probar los endpoints disponibles para:

* Autores
* Libros
* Usuarios
* Préstamos

Swagger permite realizar las solicitudes directamente desde el navegador.

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

## 2. Ingresar al proyecto

```bash
cd biblioteca-api
```

## 3. Instalar las dependencias

```bash
npm install
```

## 4. Configurar las variables de entorno

Crea el archivo `.env` a partir del archivo de ejemplo:

```bash
cp .env.example .env
```

Configura las variables necesarias:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=library
PORT=3000
```

> Los valores pueden variar dependiendo de la configuración de MongoDB utilizada.

---

# ▶️ Ejecución

## Desarrollo

```bash
npm run dev
```

## Compilar el proyecto

```bash
npm run build
```

## Ejecutar en producción

```bash
npm start
```

Una vez iniciado el servidor, la API estará disponible en:

```text
http://localhost:3000
```

---

# ❤️ Health Check

Para comprobar que el servidor está funcionando correctamente:

```http
GET /health
```

Respuesta esperada:

```json
{
  "status": "ok"
}
```

---

# 🧪 Pruebas de la API

Los endpoints pueden probarse utilizando diferentes herramientas:

* Postman
* Insomnia
* Swagger UI

Swagger permite realizar solicitudes directamente desde el navegador.

Ejemplo de creación de usuario:

```http
POST /api/v1/users
```

```json
{
  "name": "Juan Pérez",
  "email": "juan@gmail.com",
  "phone": "3001234567"
}
```

Ejemplo de creación de préstamo:

```http
POST /api/v1/loans
```

```json
{
  "userId": "ID_DEL_USUARIO",
  "bookId": "ID_DEL_LIBRO"
}
```

---

# 🛡️ Validaciones y reglas de negocio

La API implementa diferentes validaciones para mantener la integridad de los datos.

Entre ellas:

* Validación de IDs de MongoDB.
* Validación de campos obligatorios.
* Validación de formato de correo electrónico.
* Validación de usuarios existentes.
* Validación de libros existentes.
* Validación de disponibilidad de libros.
* Prevención de correos electrónicos duplicados.
* Control del estado de los libros durante los préstamos.
* Registro de fechas de creación y actualización.

---

# 📊 Flujo de un préstamo

```text
Crear préstamo
      │
      ▼
¿Existe el usuario?
      │
   ┌──┴──┐
   │     │
  NO    SÍ
   │     │
  404    ▼
       ¿Existe el libro?
          │
       ┌──┴──┐
       │     │
      NO    SÍ
       │     │
      404    ▼
          ¿Está disponible?
             │
          ┌──┴──┐
          │     │
         NO    SÍ
          │     │
         400    ▼
             Crear préstamo
                  │
                  ▼
          Libro no disponible
```

Al devolver el libro:

```text
PUT /api/v1/loans/:id/return
             │
             ▼
      Marcar préstamo
        como devuelto
             │
             ▼
       Registrar fecha
        de devolución
             │
             ▼
      Libro disponible
```

---

# 🎓 Contexto académico

Este proyecto fue desarrollado como parte de la asignatura **Programación III**.

El objetivo principal es aplicar los conceptos estudiados en clase relacionados con:

* Desarrollo de APIs REST.
* Node.js y Express.
* TypeScript.
* MongoDB.
* Arquitectura por capas.
* Arquitectura modular.
* CRUD.
* Relaciones entre entidades.
* Validación de datos.
* Reglas de negocio.
* Manejo de errores.
* Documentación de APIs con Swagger.
* Control de versiones con Git y GitHub.

---

# 👥 Modalidad

Proyecto desarrollado bajo la modalidad establecida para la asignatura:

* Individual.
* Repositorio Git con el código fuente.
* README con la documentación del proyecto.
* Historial de commits durante el desarrollo.

---

# 👨‍💻 Autor

**Ivan Prada**

Proyecto académico — **Programación III**.
