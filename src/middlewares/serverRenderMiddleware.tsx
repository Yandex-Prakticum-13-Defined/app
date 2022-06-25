import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import { addUserData, userReducer } from '../store/slice/userSlice';
import { helperReducer } from '../store/reducer/helper';
import { addLeaderboardData, leaderboardReducer } from '../store/slice/leaderboardSlice';
import { ERoutes } from '../utils/constants/routes';
import { initDb } from '../db/init';
import { addMessagesData, addTopicsData, forumReducer } from '../store/slice/forumSlice';
import { getPreparedLeaderboardData } from '../utils/getPreparedLeaderboardData';
import { getTopics } from '../utils/getTopics';
import { getMessages } from '../utils/getMessages';

export const serverRenderMiddleware = async (req: Request, res: Response) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      leaderboard: leaderboardReducer,
      helper: helperReducer,
      forum: forumReducer
    }
  });

  await initDb();

  if (res.locals.user) {
    store.dispatch(addUserData(res.locals.user));
  }

  if (req.url === ERoutes.LEADERBOARD && req.headers.cookie) {
    try {
      const leaderboardData = await getPreparedLeaderboardData(req.headers.cookie);
      await store.dispatch(addLeaderboardData(leaderboardData));
    } catch (error) {
      console.log(error);
    }
  }

  if (req.url === ERoutes.FORUM && req.headers.cookie) {
    try {
      const topics = await getTopics(req.headers.cookie);
      await store.dispatch(addTopicsData(topics));
    } catch (error) {
      console.log(error);
    }
  }

  if (req.url.startsWith(`${ERoutes.FORUM}/`) && req.headers.cookie) {
    try {
      const id = req.url.replace(`${ERoutes.FORUM}/`, '');

      if (Number.isInteger(Number(id))) {
        const messages = await getMessages(Number(id), req.headers.cookie);

        if (messages.length) {
          await store.dispatch(addMessagesData(messages));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const jsx = (
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  const reactHtml = renderToString(jsx);
  const initialState = store.getState();

  res.send(getHtml(reactHtml, initialState));
};

function getHtml(reactHtml: string, initialState = {}) {
  return `
  <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Arkanoid</title>
        <link href="/app.css" rel="stylesheet">
    </head>
    <body>
        <div id="root" class="theme theme_dark">${reactHtml}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/app.js"></script>
        <script src="/runtime.js"></script>
    </body>
    </html>
  `;
}
