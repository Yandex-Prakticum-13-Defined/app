import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.scss';
import Offline from './pages/Offline/Offline';
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
import { ERoutes } from './utils/constants/routes';
import Logout from './pages/Logout/Logout';
import { isServer } from './utils/isServer';

if (!isServer && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    } catch (error) {
      console.log('ServiceWorker registration failed: ', error);
    }
  });
}

const App: FC = () => (
  <Routes>
    <Route path={ERoutes.START} element={<Start/>}/>
    <Route path={ERoutes.REGISTER} element={<Register/>}/>
    <Route path={ERoutes.LOGIN} element={<Login/>}/>
    <Route path={ERoutes.LOGOUT} element={<Logout/>}/>
    <Route path={ERoutes.GAME} element={<Game/>}/>
    <Route path={ERoutes.LEADERBOARD} element={<Leaderboard/>}/>
    <Route path={ERoutes.PROFILE} element={<Profile/>}/>
    <Route path={ERoutes.FORUM} element={<Forum/>}>
      <Route path='' element={<ForumTopics/>}/>
      <Route path=':id' element={<ForumTopic/>}/>
    </Route>
    <Route path={ERoutes.ERROR_500} element={<Error500/>}/>
    <Route path={ERoutes.OFFLINE} element={<Offline/>}/>
    <Route path={ERoutes.FALLBACK} element={<Error404/>}/>
  </Routes>
);

export default App;
