import React, { createContext, useEffect, useState } from 'react';
import {
  getUser, ISignInData, logout, signIn
} from '../api/api';
// import { ERoutes } from '../App';

interface IAuthContextType {
  user: { login: string; password: string; };
  signin: (user: ISignInData, callback?: VoidFunction) => void;
  // signup: (profile: IRegisterData, callback: VoidFunction) => void;
  signout: (callback?: VoidFunction) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = Boolean(user);

  const signin = (newUser: ISignInData, cb?: VoidFunction) => {
    signIn(newUser).then(() => {
      getUser().then((res) => {
        setUser(res?.data?.id);
      });
      cb?.();
    });
  };

  // const signup = (profile: IRegisterData, cb: VoidFunction) => {
  //   signUp(profile)
  //     .then(() => { cb(); }).catch();
  // };

  const signout = (cb?: VoidFunction) => {
    logout().then(() => {
      setUser(null);
      cb?.();
    });
  };

  const value = {
    user, signin, signout, isLoading, isAuthenticated
  };

  useEffect(() => {
    setIsLoading(true);
    getUser().then((res) => {
      setUser(res?.data?.id);
      localStorage.id = res?.data?.id;
    }).finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
