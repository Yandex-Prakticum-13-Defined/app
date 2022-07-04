FROM node:16.13.2

WORKDIR /app

COPY . .
RUN npm install && npm run build

EXPOSE 8080
CMD node dist/server.js
