import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import Authorized from './hoc/Authorized';
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
import Forum from './pages/Forum/Forum';
import ForumTopic from './pages/Forum/components/ForumTopic/ForumTopic';
import ForumTopics from './pages/Forum/components/ForumTopics/ForumTopics';

export enum ERoutes {
  'START' = '/',
  'REGISTER' = '/register',
  'LOGIN' = '/login',
  'GAME' = '/game',
  'LEADERBOARD' = '/leaderboard',
  'PROFILE' = '/profile',
  'FORUM' = '/forum',
  'ERROR_500' = '/500',
  'FALLBACK' = '*'
}

const App: FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path={ERoutes.START} element={<Start/>}/>
        <Route path={ERoutes.REGISTER} element={<Authorized><Register/></Authorized>}/>
        <Route path={ERoutes.LOGIN} element={<Authorized><Login/></Authorized>}/>
        <Route path={ERoutes.GAME} element={<RequireAuth><Game/></RequireAuth>}/>
        <Route path={ERoutes.LEADERBOARD} element={<RequireAuth><Leaderboard/></RequireAuth>}/>
        <Route path={ERoutes.PROFILE} element={<RequireAuth><Profile/></RequireAuth>}/>
        <Route path={ERoutes.FORUM} element={<RequireAuth><Forum/></RequireAuth>}>
          <Route path='' element={<ForumTopics/>}/>
          <Route path=':id' element={<ForumTopic/>}/>
        </Route>
        <Route path={ERoutes.ERROR_500} element={<Error500/>}/>
        <Route path={ERoutes.FALLBACK} element={<Error404/>}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
