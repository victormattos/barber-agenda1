# Usar a imagem Node.js como base
FROM node:14

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json para o diretório de trabalho
COPY ./server/package*.json ./server/
COPY ./client/package*.json ./client/

# Instalar as dependências do back-end
RUN cd ./server && npm install

# Instalar as dependências do front-end
RUN cd ./client && npm install

# Copiar o código do back-end para o contêiner
COPY ./server ./server

# Copiar o código do front-end para o contêiner
COPY ./client ./client

# Construir o front-end
RUN cd ./client && npm run build

# Expor a porta da aplicação
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["node", "server/index.js"]
