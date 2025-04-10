# Etapa de construcción
FROM node:16 as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm ci --legacy-peer-deps

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación de React
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos de construcción de la aplicación React
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]

# docker build -t pruena .
