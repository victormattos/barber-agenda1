# Usa uma imagem base oficial do Node.js
FROM node:14

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Exponha a porta que o aplicativo irá rodar
EXPOSE 8080

# Define o comando para iniciar a aplicação
CMD ["node", "index.js"]
