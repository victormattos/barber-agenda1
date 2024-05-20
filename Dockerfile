# Etapa de construção do front-end
FROM node:14 as build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Etapa de configuração do back-end
FROM node:14

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ ./

# Copia os arquivos construídos do front-end
COPY --from=build /app/dist ./public

# Expõe a porta
EXPOSE 3001

# Inicia a aplicação
CMD ["node", "index.js"]
