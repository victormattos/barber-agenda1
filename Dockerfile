# Use uma imagem oficial do Node.js como imagem base
FROM node:14

# Cria um diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY ./server/package*.json ./server/
COPY ./client/package*.json ./client/

# Instala as dependências do servidor
RUN cd ./server && npm install

# Instala as dependências do cliente
RUN cd ./client && npm install

# Copia os arquivos da aplicação
COPY ./server ./server
COPY ./client ./client

# Define as variáveis de ambiente
ENV MYSQLHOST=$MYSQLHOST
ENV MYSQLUSER=$MYSQLUSER
ENV MYSQLPASSWORD=$MYSQLPASSWORD
ENV MYSQLDATABASE=$MYSQLDATABASE
ENV MYSQLPORT=$MYSQLPORT

# Expõe a porta que a aplicação irá rodar
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["node", "server/index.js"]

