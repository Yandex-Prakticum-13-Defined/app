import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';

import './index.scss';
import { AuthProvider } from './hoc/AuthProvider';
import RequireAuth from './hoc/RequireAuth';
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
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={ERoutes.GAME} element={
            <RequireAuth><Game/></RequireAuth>
                }/>
          <Route path={ERoutes.LEADERBOARD} element={<RequireAuth><Leaderboard/></RequireAuth>}/>
          <Route path={ERoutes.PROFILE} element={<RequireAuth><Profile/></RequireAuth>}/>
          <Route path={ERoutes.START} element={<Start/>}/>
          <Route path={ERoutes.LOGIN} element={<Login/>}/>
          <Route path={ERoutes.REGISTER} element={<Register/>}/>
          <Route path={ERoutes.ERROR_404} element={<Error404/>}/>
          <Route path={ERoutes.ERROR_500} element={<Error500/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
