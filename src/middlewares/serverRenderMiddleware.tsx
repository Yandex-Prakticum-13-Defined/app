import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import { addUserData, userReducer } from '../store/slice/userSlice';
import { helperReducer } from '../store/reducer/helper';
import { leaderboardReducer } from '../store/slice/leaderboardSlice';

export const serverRenderMiddleware = (req: Request, res: Response) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      leaderboard: leaderboardReducer,
      helper: helperReducer
    }
  });

  if (res.locals.user) {
    store.dispatch(addUserData(res.locals.user));
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
        <div id="root">${reactHtml}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/app.js"></script>
        <script src="/runtime.js"></script>
    </body>
    </html>
  `;
}
