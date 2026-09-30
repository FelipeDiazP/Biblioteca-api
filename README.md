# 📚 Biblioteca API

API REST para la **gestión de una Biblioteca**, desarrollada como proyecto de la asignatura de Programación III.

El proyecto permite administrar **autores, libros y préstamos**, aplicando una arquitectura por capas y buenas prácticas de desarrollo de APIs REST.

## 🚀 Tecnologías

* **Node.js**
* **Express 5**
* **TypeScript**
* **MongoDB**
* **MongoDB Driver**
* **Swagger / OpenAPI**
* **dotenv**

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura por capas:

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

* **Routes:** Define los endpoints de la API.
* **Controller:** Recibe las peticiones HTTP y construye las respuestas.
* **Service:** Contiene la lógica de negocio.
* **Repository:** Se encarga de la comunicación con MongoDB.

## 📁 Estructura del proyecto

```text
biblioteca-api/
│
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── authors/
│   │       │   ├── author.controller.ts
│   │       │   ├── author.repository.ts
│   │       │   ├── author.routes.ts
│   │       │   └── author.service.ts
│   │       │
│   │       ├── books/
│   │       │   ├── book.controller.ts
│   │       │   ├── book.repository.ts
│   │       │   ├── book.routes.ts
│   │       │   └── book.service.ts
│   │       │
│   │       └── loans/
│   │           ├── loan.controller.ts
│   │           ├── loan.repository.ts
│   │           ├── loan.routes.ts
│   │           └── loan.service.ts
│   │
│   ├── config/
│   │   └── database.ts
│   │
│   └── server.ts
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

> La estructura puede variar ligeramente dependiendo de la organización final del proyecto.

---

# 📚 Módulos

La API está dividida en tres módulos principales.

## 👨‍💻 Autores

Permite gestionar los autores registrados en la biblioteca.

### Endpoints

| Método | Ruta                        | Descripción                    |
| ------ | --------------------------- | ------------------------------ |
| POST   | `/api/v1/authors`           | Crear un autor                 |
| GET    | `/api/v1/authors`           | Obtener todos los autores      |
| GET    | `/api/v1/authors/:id`       | Obtener un autor por ID        |
| GET    | `/api/v1/authors/:id/books` | Obtener los libros de un autor |
| PUT    | `/api/v1/authors/:id`       | Actualizar un autor            |
| DELETE | `/api/v1/authors/:id`       | Eliminar un autor              |

---

## 📖 Libros

Permite administrar los libros registrados y su relación con los autores.

### Endpoints

| Método | Ruta                | Descripción              |
| ------ | ------------------- | ------------------------ |
| POST   | `/api/v1/books`     | Crear un libro           |
| GET    | `/api/v1/books`     | Obtener todos los libros |
| GET    | `/api/v1/books/:id` | Obtener un libro por ID  |
| PUT    | `/api/v1/books/:id` | Actualizar un libro      |
| DELETE | `/api/v1/books/:id` | Eliminar un libro        |

---

## 📋 Préstamos

Permite gestionar los préstamos de libros de la biblioteca.

### Endpoints

| Método | Ruta                | Descripción                 |
| ------ | ------------------- | --------------------------- |
| POST   | `/api/v1/loans`     | Crear un préstamo           |
| GET    | `/api/v1/loans`     | Obtener todos los préstamos |
| GET    | `/api/v1/loans/:id` | Obtener un préstamo por ID  |
| PUT    | `/api/v1/loans/:id` | Actualizar un préstamo      |
| DELETE | `/api/v1/loans/:id` | Eliminar un préstamo        |

---

# 🔗 Relaciones entre entidades

La API maneja relaciones entre los diferentes módulos:

```text
Autor
  │
  └── Libros
        │
        └── Préstamos
```

Un **autor** puede tener varios libros y los **préstamos** están relacionados con los libros registrados en la biblioteca.

Además, la aplicación implementa las validaciones y reglas de negocio necesarias para mantener la integridad de los datos.

# 📑 Documentación de la API

La API cuenta con documentación mediante **Swagger / OpenAPI**.

Con el servidor ejecutándose, puedes acceder a:

```text
http://localhost:3000/api-docs/
```

Desde Swagger puedes consultar y probar los endpoints disponibles para:

* Autores
* Libros
* Préstamos

# ⚙️ Instalación

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresa al proyecto:

```bash
cd biblioteca-api
```

Instala las dependencias:

```bash
npm install
```

Crea el archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

Configura las variables de entorno necesarias, especialmente la conexión a MongoDB.

Ejemplo:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=library
PORT=3000
```

> Los valores pueden variar dependiendo de la configuración de MongoDB utilizada.

# ▶️ Ejecución

### Desarrollo

```bash
npm run dev
```

### Compilar el proyecto

```bash
npm run build
```

### Ejecutar en producción

```bash
npm start
```

Una vez iniciado el servidor, la API estará disponible en:

```text
http://localhost:3000
```

# ❤️ Health Check

Para comprobar que el servidor está funcionando:

```http
GET /health
```

Respuesta esperada:

```json
{
  "status": "ok"
}
```

# 🧪 Pruebas de la API

Los endpoints pueden probarse utilizando herramientas como:

* Postman
* Insomnia
* Swagger UI

Swagger permite realizar las solicitudes directamente desde el navegador.

# 🎓 Contexto académico

Este proyecto fue desarrollado como parte de la asignatura **Programación III**.

El objetivo principal es aplicar los conceptos estudiados en clase relacionados con:

* Desarrollo de APIs REST.
* Node.js y Express.
* TypeScript.
* MongoDB.
* Arquitectura por capas.
* CRUD.
* Relaciones entre entidades.
* Validación de datos.
* Reglas de negocio.
* Documentación de APIs con Swagger.
* Control de versiones con Git y GitHub.

# 👥 Modalidad

Proyecto desarrollado bajo la modalidad establecida para la asignatura:

* Individual o en parejas.
* Repositorio Git con el código fuente.
* README con la documentación del proyecto.
* Historial de commits durante el desarrollo.

# 👨‍💻 Autor

**Ivan Prada**

Proyecto académico — Programación III.
