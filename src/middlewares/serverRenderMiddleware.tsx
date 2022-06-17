import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import { addUserData, userReducer } from '../store/slice/userSlice';
import { helperReducer } from '../store/reducer/helper';
import { addLeaderboardData, leaderboardReducer, leaderboardRequest } from '../store/slice/leaderboardSlice';
import { ERoutes } from '../utils/constants/routes';
import { baseURL, instance, TEAM_NAME } from '../API/API';
import { IUserScoreData } from '../API/leaderboardAPI';
import mockProfilePicture from '../images/mock-profile-picture.jpg';

export const serverRenderMiddleware = async (req: Request, res: Response) => {
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

  if (req.url === ERoutes.LEADERBOARD && req.headers.cookie) {
    try {
      const { data } = await instance.post(`leaderboard/${TEAM_NAME}`, leaderboardRequest, {
        headers: { Cookie: req.headers.cookie }
      });

      const leaderboardData = await Promise.all(
        data.map(async (item: IUserScoreData, i: number) => {
          const { data: userInfo } = await instance.get(`user/${item.data.userId}`, {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            headers: { Cookie: req.headers.cookie! }
          });

          return {
            number: i + 1,
            image: userInfo.avatar ? `${baseURL}/resources${userInfo.avatar}` : mockProfilePicture,
            name: userInfo.first_name,
            points: item.data.score
          };
        })
      );
      await store.dispatch(addLeaderboardData(leaderboardData));
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
