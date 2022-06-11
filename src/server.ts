import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import https from 'https';
import express from 'express';
import compression from 'compression';
import { serverRenderMiddleware } from './middlewares/serverRenderMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';

const key = fs.readFileSync(path.resolve(__dirname, '../key.pem'));
const cert = fs.readFileSync(path.resolve(__dirname, '../cert.pem'));

const app = express();

app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', authMiddleware, serverRenderMiddleware);

const server = https.createServer({ key, cert }, app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log('Application is started on localhost:', port);
});
