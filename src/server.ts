import 'dotenv/config';
import path from 'path';
import express from 'express';
import compression from 'compression';
import { serverRenderMiddleware } from './server-render-middleware';

const app = express();

app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', serverRenderMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Application is started on localhost:', port);
});
