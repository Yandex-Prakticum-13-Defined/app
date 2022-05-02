import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.scss';
import Start from './pages/Start/Start';
import Game from './pages/Game/Game';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Error404 from './pages/Error/Error404';
import Error500 from './pages/Error/Error500';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Forum from './pages/Forum/Forum';
import ForumTopic from './components/ForumTopic/ForumTopic';
import ForumTopics from './components/ForumTopics/ForumTopics';

export enum ERoutes {
  'START' = '/',
  'GAME' = '/game',
  'REGISTER' = '/register',
  'LEADERBOARD' = '/leaderboard',
  'LOGIN' = '/login',
  'FORUM' = '/forum',
  'ERROR_500' = '/500',
  'FALLBACK' = '/404'
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ERoutes.START} element={<Start/>}/>
        <Route path={ERoutes.GAME} element={<Game/>}/>
        <Route path={ERoutes.REGISTER} element={<Register/>}/>
        <Route path={ERoutes.LEADERBOARD} element={<Leaderboard/>}/>
        <Route path={ERoutes.LOGIN} element={<Login/>}/>
        <Route path={ERoutes.FORUM} element={<Forum/>}>
          <Route path='' element={<ForumTopics/>}/>
          <Route path=':id' element={<ForumTopic/>}/>
        </Route>
        <Route path={ERoutes.ERROR_500} element={<Error500/>}/>
        <Route path={ERoutes.FALLBACK} element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
