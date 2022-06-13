FROM node:16

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . /app
RUN npm run build

EXPOSE 5000
CMD node dist/server.js
