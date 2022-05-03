import React, { createContext, useState } from 'react';
import { ISignInData, logout, signIn } from '../api/api';

interface IAuthContextType {
  user: any;
  signin: (user: ISignInData, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<IAuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
  const [user, setUser] = useState<any>(null);

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

  const value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
