import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import Auth from './hoc/Auth';
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

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async () => {
//     try {
//       const registration = await navigator.serviceWorker.register('/sw.js');
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     } catch (error) {
//       console.log('ServiceWorker registration failed: ', error);
//     }
//   });
// }

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ERoutes.START} element={<Auth><Start/></Auth>}/>
      <Route path={ERoutes.REGISTER} element={<Auth><Register/></Auth>}/>
      <Route path={ERoutes.LOGIN} element={<Auth><Login/></Auth>}/>
      <Route path={ERoutes.LOGOUT} element={<Auth><Logout/></Auth>}/>
      <Route path={ERoutes.GAME} element={<Auth><Game/></Auth>}/>
      <Route path={ERoutes.LEADERBOARD} element={<Auth><Leaderboard/></Auth>}/>
      <Route path={ERoutes.PROFILE} element={<Auth><Profile/></Auth>}/>
      <Route path={ERoutes.FORUM} element={<Auth><Forum/></Auth>}>
        <Route path='' element={<ForumTopics/>}/>
        <Route path=':id' element={<ForumTopic/>}/>
      </Route>
      <Route path={ERoutes.ERROR_500} element={<Error500/>}/>
      <Route path={ERoutes.OFFLINE} element={<Offline/>}/>
      <Route path={ERoutes.FALLBACK} element={<Error404/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
