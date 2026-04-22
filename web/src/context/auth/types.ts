import type { Dispatch, SetStateAction } from 'react';

export type AuthContextType = {
  isAuth: boolean;
  isLoading: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};
