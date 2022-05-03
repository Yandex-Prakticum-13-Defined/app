import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';

import './index.scss';
import { getUser } from './api/api';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Spinner from './components/Spinner/Spinner';
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

interface IAppContext {
  userId: number | null;
  // signIn: any;
  // signout: () => void;
}

export const AppContext = React.createContext<IAppContext>(null!);

function App() {
  const { id } = localStorage;

  const [userId, setUserId] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  // const signInValue = signIn(id).then((data) => {
  //   console.log(data);
  // });

  // const value = {userId, signIn}

  // const RequireApp = ({ children }: { children: JSX.Element; }) => {
  //   const auth = React.useContext(AppContext);
  //   const location = useLocation();
  //   console.log('auth', auth);
  //   if (!auth.userId) {
  //     return (
  //       <Navigate to={ERoutes.LOGIN} state={{ from: location }} replace />
  //     );
  //   }
  //
  //   return children;
  // };

  useEffect(() => {
    if (id) {
      setIsLoader(true);
      getUser().then((res) => {
        setIsLoader(false);
        setUserId(res?.data?.id);
        // localStorage.id = res?.data?.id;
      }).catch(() => setIsLoader(false));
    }
  }, [id]);
  // console.log('1', localStorage.getItem('id'));
  // const contextValue = useMemo(() => ({ userId, signInValue }), []);

  return (
    <BrowserRouter>
      <AuthProvider>
        {isLoader && !userId ? <Spinner />
          : (

            <Routes>
              <Route path={ERoutes.GAME} element={
                <RequireAuth><Game/></RequireAuth>
                }/>
              <Route path={ERoutes.LEADERBOARD} element={<Leaderboard/>}/>
              <Route path={ERoutes.PROFILE} element={<Profile/>}/>
              <Route path={ERoutes.START} element={<Start/>}/>
              <Route path={ERoutes.LOGIN} element={<Login/>}/>
              <Route path={ERoutes.REGISTER} element={<Register/>}/>
              <Route path={ERoutes.ERROR_404} element={<Error404/>}/>
              <Route path={ERoutes.ERROR_500} element={<Error500/>}/>
            </Routes>
          )}
        {/* <ProtectedRoute exact path={ERoutes.LOGIN} element={<Login/>}/> */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
