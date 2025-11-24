# backend/Dockerfile

# Etapa 1: build de TypeScript
FROM node:18-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar código fuente y tsconfig
COPY tsconfig.json ./
COPY src ./src

# Compilar TypeScript -> dist
RUN npm run build        # o: RUN npx tsc  (si no tienes script build)

# Etapa 2: imagen final de producción
FROM node:18-alpine

WORKDIR /app

# Copiamos solo lo necesario
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

# Variables de entorno por defecto (puedes sobreescribirlas en docker-compose)
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server.js"]
