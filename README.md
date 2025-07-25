# 🧩 Proyecto de Microservicios con NestJS, GraphQL, WebSocket y Prisma

Este proyecto es un sistema modular basado en **microservicios** utilizando **NestJS**, que incluye comunicación vía **GraphQL**, **WebSocket** y **mensajería entre microservicios** usando **TCP**, **Redis** o **NATS**.

---

## 📦 Estructura General

El proyecto se divide en varios servicios independientes:

| Servicio            | Puerto | Función Principal                                                                 |
|---------------------|--------|-----------------------------------------------------------------------------------|
| `api-gateway`       | 3000   | API REST principal: expone endpoints públicos, coordina entre servicios.         |
| `time-service`      | N/A    | Microservicio que devuelve la hora actual.                                       |
| `websocket-server`  | 3002   | Chat WebSocket que permite enviar/recibir mensajes en tiempo real.               |
| `graphql-service`   | 3003   | Servicio GraphQL que gestiona productos con Prisma y base de datos.              |

---

## 🧠 Descripción de Servicios

### 1. `api-gateway` (NestJS REST)

- Exposición de endpoints REST:
  - `GET /hora`: Consulta la hora al `time-service`.
  - `GET /productos`: Obtiene productos desde `graphql-service`.
  - `GET /producto/:id`: Consulta un producto por ID.
  - `POST /producto`: Crea un producto vía GraphQL.
  - `GET /enviar-mensaje`: Envia mensaje por WebSocket.

### 2. `Microservice-Time` (NestJS Microservice)

- Microservicio con patrón `MessagePattern('get_time')`.
- Responde con la hora actual de Ecuador.
- Comunicación mediante **TCP**, **Redis** o **NATS** (según `.env`).

### 3. `Graph-QL` (NestJS + GraphQL + Prisma)

- Servicio con `@Resolver`, `@Query`, `@Mutation`.
- Modelo: `Product` (con campos `id`, `name`, `description`, `price`, etc.).
- Prisma ORM para acceso a base de datos.

### 4. `Real-time` (Socket.IO + NestJS)

- Gateway WebSocket que permite:
  - Enviar mensajes (`chatMessage`)
  - Notificar conexión/desconexión de usuarios
- Compatible con múltiples clientes WebSocket.

---

# ▶️ Cómo Ejecutar el Proyecto

## 1. Instalar dependencias
```bash
npm install
```
Haz esto en cada servicio (API-Gateway, Graph-QL, Real-time, Microservice-Time).

---

## 2. Ejecutar cada servicio
- API Gateway
```bash
cd api-gateway
npm run start:dev
```

- GraphQL Service
```bash
cd graphql-service
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

- WebSocket Server
```bash
cd websocket-server
npm run start:dev
```

- Time Service 
```bash
cd time-service
# Asegúrate de definir el transporte en .env
npm run start:dev
```

---

## 🧪 Pruebas Manuales
- Consultar productos:

GET http://localhost:3000/productos

- Crear producto:

POST http://localhost:3000/producto

Content-Type: application/json

Body:

{
  "name": "Camiseta",
  
  "description": "100% algodón",
  
  "price": 19.99
}
- Consultar hora (via microservicio):

GET http://localhost:3000/hora

-Enviar mensaje WebSocket:

GET http://localhost:3000/enviar-mensaje?usuario=Juan&mensaje=Hola

## 🕸️ Stack Tecnológico
- NestJS: Framework backend principal.

- GraphQL + Apollo Server: API declarativa para productos.

- Prisma ORM: Acceso a base de datos con PostgreSQL.

- Socket.IO: Comunicación WebSocket bidireccional.

- Microservices: Comunicación entre servicios usando:

- TCP

- Redis

- NATS

- RxJS: Manejo de respuestas asíncronas (firstValueFrom()).

## 🗃️ Modelo de Datos (Prisma)
```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```              