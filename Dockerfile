# Imagen base
FROM node:18

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de la aplicación
COPY . /app

# Exponer puerto
EXPOSE 4000

# Ejecutar aplicación
CMD ["npm", "start"]
