# Imagen base
FROM node:14

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de la aplicación
COPY . /app

# Exponer puerto
EXPOSE 4000

# Ejecutar aplicación
CMD ["npm", "start"]
