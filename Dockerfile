# 1. Build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Si usas Vite, las envs deben empezar por VITE_
# VITE_API_URL sale como build arg opcional
ARG VITE_URL_API_DEV
ARG VITE_URL_API_PROD
ARG VITE_PROD

ENV VITE_URL_API_DEV=$VITE_URL_API_DEV
ENV VITE_URL_API_PROD=$VITE_URL_API_PROD
ENV VITE_PROD=$VITE_PROD

RUN npm run build

# 2. Nginx para servir estáticos
FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html

# Limpia el html por defecto
RUN rm -rf ./*

# Copia el build del front
COPY --from=build /app/dist ./

# Copia un nginx.conf simple (opcional, si quieres SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
