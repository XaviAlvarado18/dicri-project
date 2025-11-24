# frontend/Dockerfile

# Etapa 1: build de la SPA
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
# Ojo: VITE_API_URL debe apuntar al backend dentro de Docker (ver docker-compose)
RUN npm run build

# Etapa 2: servir estáticos con Nginx
FROM nginx:1.27-alpine

# Copiar build de Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración simple de Nginx para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
