# Aplicación de Gestión de Notas Personales

Una aplicación full-stack para gestionar notas personales construida con Next.js, Nest.js y MySQL.

## Estructura del Proyecto

Este proyecto está dividido en dos partes principales:

- **backend/**: API REST desarrollada con Nest.js y MySQL
- **frontend/**: Interfaz de usuario desarrollada con Next.js y TailwindCSS

Cada carpeta contiene su propio README con instrucciones específicas de instalación y ejecución.

## Requisitos Generales

- Node.js (v16 o superior)
- MySQL
- npm o yarn

## Instrucciones Rápidas

1. Configura la base de datos MySQL
2. Configura e inicia el backend (puerto 3001)
3. Configura e inicia el frontend (puerto 3000)

Para instrucciones detalladas, consulta los README en cada carpeta:
- [Instrucciones del Backend](./backend/README.md)
- [Instrucciones del Frontend](./frontend/README.md)

## Capturas de Pantalla

[Incluir capturas de pantalla aquí]

## Licencia

MIT
````

# Backend de la Aplicación de Gestión de Notas

API REST desarrollada con Nest.js, TypeORM y MySQL para la gestión de notas personales.

## Características

- Autenticación de usuarios con JWT
- Endpoints CRUD para notas
- Validación de datos
- Relaciones entre entidades (usuarios y notas)
- Protección de rutas

## Tecnologías Utilizadas

- Nest.js
- TypeORM
- MySQL
- JWT para autenticación
- bcrypt para hash de contraseñas
- class-validator para validación de datos

## Requisitos Previos

- Node.js (v16 o superior)
- MySQL
- npm o yarn

## Instalación y Configuración

### 1. Configurar la Base de Datos

1. Crea una base de datos MySQL llamada `proyect`
2. Ejecuta los scripts de migración ubicados en la carpeta `sql`

```bash
mysql -u root -p proyect < sql/create_tables.sql
mysql -u root -p proyect < sql/insert_data.sql
```

### 2. Instalar Dependencias

```shellscript
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```plaintext
DB_USER=root
DB_NAME=proyect
DB_PASSWORD=tu_contraseña_mysql
DB_HOST=localhost
DB_PORT=3306

BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

### 4. Iniciar el Servidor

```shellscript
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

El servidor estará disponible en [http://localhost:3001](http://localhost:3001)

## Estructura del Proyecto

```plaintext
backend/
├── src/
│   ├── auth/           # Módulo de autenticación
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   ├── guards/
│   │   └── strategies/
│   ├── notes/          # Módulo de notas
│   │   ├── notes.controller.ts
│   │   ├── notes.module.ts
│   │   ├── notes.service.ts
│   │   ├── dto/
│   │   └── entities/
│   ├── users/          # Módulo de usuarios
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   └── entities/
│   ├── app.module.ts
│   └── main.ts
├── sql/                # Scripts SQL
│   ├── create_tables.sql
│   └── insert_data.sql
├── .env                # Variables de entorno (no incluir en git)
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Autenticación

- `POST /auth/register` - Registrar un nuevo usuario
- `POST /auth/login` - Iniciar sesión y obtener token JWT

### Notas

- `GET /notes` - Obtener todas las notas del usuario autenticado
- `GET /notes/:id` - Obtener una nota específica
- `POST /notes` - Crear una nueva nota
- `PATCH /notes/:id` - Actualizar una nota existente
- `DELETE /notes/:id` - Eliminar una nota

## Datos de Prueba

El script `insert_data.sql` incluye los siguientes usuarios de prueba:

- **Email**: [john@example.com](mailto:john@example.com)
- **Contraseña**: password123
- **Email**: [jane@example.com](mailto:jane@example.com)
- **Contraseña**: password123

## Pruebas

```shellscript
# Pruebas unitarias
npm run test

# Pruebas e2e
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```