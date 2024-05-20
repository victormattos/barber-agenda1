# Etapa de construção do front-end
FROM node:14 as build

WORKDIR /app

COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Etapa de configuração do back-end
FROM node:14

WORKDIR /app

COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ ./

# Copia os arquivos construídos do front-end
COPY --from=build /app/dist ./public

EXPOSE 3001

CMD ["node", "index.js"]
