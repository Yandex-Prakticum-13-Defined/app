import React, { createContext, useEffect, useState } from 'react';
import {
  getUser, ISignInData, logout, signIn
} from '../api/api';

interface IAuthContextType {
  user: { login: string; password: string; };
  signin: (user: ISignInData, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(null);

  const signin = (newUser: ISignInData, cb: VoidFunction) => {
    signIn(newUser).then(() => {
      setUser(newUser);
      cb();
    });
  };

  const signout = (cb: VoidFunction) => {
    logout().then(() => {
      setUser(null);
      cb();
    });
  };

  const value = {
    user, signin, signout, isLoading, isAuthenticated
  };
  console.log('isLoading', isLoading);
  console.log('isAuthenticated', isAuthenticated);

  useEffect(() => {
    setIsLoading(true);
    getUser().then((res) => {
      setIsLoading(false);
      setUser(res?.data?.id);
      localStorage.id = res?.data?.id;
      setIsAuthenticated(true);
    }).finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
