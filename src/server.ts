import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import https from 'https';
import express from 'express';
import compression from 'compression';
import { serverRenderMiddleware } from './middlewares/serverRenderMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';
import { logG } from './utils/log';
import { getTopics } from './utils/getTopics';
import { getMessages } from './utils/getMessages';
import { createMessage, createTopic } from './db/init';

const key = fs.readFileSync(path.resolve(__dirname, '../key.pem'));
const cert = fs.readFileSync(path.resolve(__dirname, '../cert.pem'));

const app = express();

app
  .use(compression())
  .use(express.json())
  .use(express.static(path.resolve(__dirname, '../dist')));

app.get('/topics', authMiddleware, async (req, res) => {
  try {
    const topics = await getTopics(req.headers.cookie);
    res.send(topics);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/messages', authMiddleware, async (req, res) => {
  try {
    const messages = await getMessages(req.body.topicId, req.headers.cookie);
    res.send(messages);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/message', authMiddleware, async (req, res) => {
  try {
    createMessage(req.body.message).then(() => res.send('OK'));
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/topic', authMiddleware, async (req, res) => {
  try {
    createTopic(req.body.topic).then(() => res.send('OK'));
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/*', authMiddleware, serverRenderMiddleware);

const server = https.createServer({ key, cert }, app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  logG(`Application is started on localhost: ${port}`);
});
