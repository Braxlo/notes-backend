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