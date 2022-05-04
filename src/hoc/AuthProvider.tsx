import React, {
  createContext, FC, useEffect, useState
} from 'react';
import {
  getUser, IRegisterData, ISignInData, logout, signIn, signUp
} from '../api/api';

interface IAuthContextType {
  user: { login: string; password: string; };
  signin: (user: ISignInData, callback?: VoidFunction) => void;
  signup: (profile: IRegisterData, callback?: VoidFunction) => void;
  signout: (callback?: VoidFunction) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type TAuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthContext = createContext<IAuthContextType>(null!);

export const AuthProvider:FC<TAuthProviderProps> = ({ children }) => {
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

  const signup = (profile: IRegisterData, cb?: VoidFunction) => {
    signUp(profile)
      .then(() => {
        getUser().then((res) => {
          setUser(res?.data?.id);
        });
        cb?.();
      });
  };

  const signout = (cb?: VoidFunction) => {
    logout().then(() => {
      setUser(null);
      cb?.();
    });
  };

  const value = {
    user, signin, signup, signout, isLoading, isAuthenticated
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
