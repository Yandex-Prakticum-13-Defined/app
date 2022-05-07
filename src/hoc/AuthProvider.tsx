import React, {
  createContext, FC, useEffect, useState
} from 'react';
import {
  getUser, IRegisterData, ISignInData, IUserData, logout, signIn, signUp
} from '../api/api';

interface IAuthContextType {
  user: IUserData;
  signin: (user: ISignInData, callback?: VoidFunction) => void;
  signup: (profile: IRegisterData, callback?: VoidFunction) => void;
  signout: (callback?: VoidFunction) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type TAuthProviderProps = {
  children?: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<IAuthContextType>(null!);

export const AuthProvider: FC<TAuthProviderProps> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = Boolean(user);

  const signin = (newUser: ISignInData, cb?: VoidFunction) => {
    signIn(newUser).then(() => {
      getUser().then((res) => {
        setUser(res?.data);
      });
      cb?.();
    });
  };

  const signup = (profile: IRegisterData, cb?: VoidFunction) => {
    signUp(profile)
      .then(() => {
        getUser().then((res) => {
          setUser(res?.data);
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

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    user, signin, signup, signout, isLoading, isAuthenticated
  };

  useEffect(() => {
    setIsLoading(true);
    getUser().then((res) => {
      setUser(res?.data);
    }).finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
