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
import Profile from './pages/Profile/Profile';

export enum ERoutes {
  'START' = '/',
  'GAME' = '/game',
  'REGISTER' = '/register',
  'LEADERBOARD' = '/leaderboard',
  'LOGIN' = '/login',
  'PROFILE' = '/profile',
  'ERROR_404' = '/404',
  'ERROR_500' = '/500'
}

function App() {
  // try {
  //   const user = getUser();
  //   console.log(user);
  // } catch (e) {
  //   console.log(e);
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ERoutes.START} element={<Start/>}/>
        <Route path={ERoutes.GAME} element={<Game/>}/>
        <Route path={ERoutes.REGISTER} element={<Register/>}/>
        <Route path={ERoutes.LEADERBOARD} element={<Leaderboard/>}/>
        <Route path={ERoutes.LOGIN} element={<Login/>}/>
        <Route path={ERoutes.PROFILE} element={<Profile/>}/>
        <Route path={ERoutes.ERROR_404} element={<Error404/>}/>
        <Route path={ERoutes.ERROR_500} element={<Error500/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
