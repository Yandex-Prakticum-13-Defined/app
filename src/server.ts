import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import https from 'https';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { serverRenderMiddleware } from './middlewares/serverRenderMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';
import { logG } from './utils/log';
import { getTopics } from './utils/getTopics';
import { getMessages } from './utils/getMessages';
import { createMessage, createTopic } from './db/init';
import { EDBRoutes } from './utils/constants/routes';
import { themeMiddleware } from './middlewares/themeMiddleware';

const key = fs.readFileSync(path.resolve(__dirname, '../key.pem'));
const cert = fs.readFileSync(path.resolve(__dirname, '../cert.pem'));

const app = express();

app
  .use(compression())
  .use(cookieParser())
  .use(express.json())
  .use(express.static(path.resolve(__dirname, '../dist')));

app.get(EDBRoutes.TOPICS, authMiddleware, async (req, res) => {
  try {
    const topics = await getTopics(req.headers.cookie!);
    res.send(topics);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post(EDBRoutes.MESSAGES, authMiddleware, async (req, res) => {
  try {
    const messages = await getMessages(req.body.topicId, req.headers.cookie!);
    res.send(messages);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post(EDBRoutes.MESSAGE, authMiddleware, async (req, res) => {
  try {
    await createMessage(req.body.message);
    res.send('OK');
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post(EDBRoutes.TOPIC, authMiddleware, async (req, res) => {
  try {
    await createTopic(req.body.topic);
    res.send('OK');
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get(EDBRoutes.THEME, async (req, res) => {
  try {
    const currentTheme = req.cookies.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    res.cookie('theme', newTheme);
    res.send(newTheme);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/*', themeMiddleware, authMiddleware, serverRenderMiddleware);

const server = https.createServer({ key, cert }, app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  logG(`Application is started on localhost: ${port}`);
});
