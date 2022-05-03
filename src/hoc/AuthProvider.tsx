import React, { createContext, useState } from 'react';
import { signIn } from '../api/api';

interface IAuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signup: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<IAuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
  const [user, setUser] = useState<any>(null);

  // const signin = (newUser: string, cb: VoidFunction) => {
  //   setUser(newUser);
  //   cb();
  // };

  const signin =  signIn(userId).then(() => {
      setUser(userId);
      cb();
    });
  };
  const signup = (cb: VoidFunction) => {
    setUser(null);
    cb();
  };

  const value = { user, signin, signup };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
