import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthContextType } from './types';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth') === 'true') {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  const value: AuthContextType = {
    isAuth,
    isLoading,
    setIsAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
