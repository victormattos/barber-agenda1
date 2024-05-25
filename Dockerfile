# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json
COPY ./server/package*.json ./

# Instala as dependências do servidor
RUN npm install

# Copia o restante dos arquivos do servidor
COPY ./server .

# Define o comando para iniciar a aplicação
CMD ["node", "index.js"]
