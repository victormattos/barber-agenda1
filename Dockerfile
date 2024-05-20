# Usa uma imagem base do Node.js
FROM node:14

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json
COPY ./server/package*.json ./server/
COPY ./client/package*.json ./client/

# Instala as dependências do servidor
RUN cd ./server && npm install

# Instala as dependências do cliente
RUN cd ./client && npm install

# Copia o restante dos arquivos do servidor e do cliente
COPY ./server ./server
COPY ./client ./client

# Build do cliente
RUN cd ./client && npm run build

# Define o comando para iniciar a aplicação
CMD ["node", "server/index.js"]
