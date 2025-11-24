# Sistema de Gestión de Evidencias DICRI  
**Autor:** **Kristopher Javier Alvarado López**

---

## 📖 Descripción General

El **Sistema de Gestión de Evidencias DICRI** es una plataforma web creada para apoyar a la  
**Dirección de Investigación Criminalística (DICRI)** del Ministerio Público en la administración de:

- Expedientes (Files)  
- Indicios/Evidencias  
- Flujos de aprobación  
- Roles de usuario (Técnico, Coordinador, Admin)

Basado en el *Manual Técnico* del sistema. (Archivo: dicri.pdf)

---

## 🏗️ Arquitectura del Sistema

El proyecto sigue una arquitectura **cliente–servidor en tres capas**:


### Frontend
- React + TypeScript  
- Vite  
- Ant Design  
- TailwindCSS  
- Axios (con interceptor JWT)

### Backend
- Node.js  
- Express  
- TypeScript  
- JWT para autenticación  
- mssql para acceso a datos  
- Swagger UI (/api/docs)

### Base de Datos
- SQL Server 2022  
- Base: DicriProjectDB  
- Tablas: Users, Statuses, Files, Evidence  
- Procedimientos almacenados

---

## 🧰 Tecnologías Utilizadas

| Componente | Tecnologías |
|-----------|-------------|
| Frontend | React, TypeScript, Vite, Ant Design, TailwindCSS |
| Backend | Node.js, Express, TypeScript, JWT, mssql |
| Base de Datos | SQL Server |
| Infraestructura | Docker & Docker Compose |

---

## 🔐 Seguridad

### Autenticación
- JWT emitido en `/api/auth/login`.
- El token se guarda en `localStorage`.
- Cada petición incluye:


### Autorización por roles
Roles principales:
- `TECNICO`
- `COORDINADOR`
- `ADMIN`

---

## 🗄️ Modelo de Datos

### Entidades:
- Users  
- Statuses  
- Files  
- Evidence  

### Relaciones:
- Users 1:N Files  
- Users 1:N Evidence  
- Statuses 1:N Files  
- Files 1:N Evidence  

---

## 🧪 Pruebas

El backend incluye pruebas unitarias con:

- Jest  
- ts-jest  
- supertest  

Se prueban:
- Middlewares  
- Controladores  
- Lógica del login  
- Lógica de expedientes e indicios  

---

## 🐳 Despliegue con Docker

### Construir imágenes

```powershell
docker-compose build
```

### Levantar servicios

```powershell
docker-compose up
```


### Servicios expuestos
- Frontend → http://localhost:5173  
- API Backend → http://localhost:3000/api  
- Swagger → http://localhost:3000/api/docs  

---

## 📸 Capturas del Sistema

El manual incluye capturas de:

- Pantalla de login  
- Vista de expedientes  
- Detalle de expediente  

---

## 🧾 Conclusión

Este proyecto implementa una solución robusta, modular y escalable para la gestión de evidencias de la DICRI, integrando una SPA moderna, una API bien estructurada y una base de datos SQL Server, todo dentro de un ambiente Dockerizado.

---

## ✍️ Autor

**Kristopher Javier Alvarado López**  
Desarrollador del Sistema de Gestión de Evidencias DICRI
