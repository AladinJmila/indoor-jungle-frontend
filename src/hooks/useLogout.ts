import { useState } from 'react';
import { logoutAction } from '../context/AuthContext';
import { projectAuth } from './../firebase/config';
import useAuthContext from './useAuthContext';

const Logout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { authDispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await projectAuth.signOut();

      setIsPending(false);
      authDispatch(logoutAction);
    } catch (error: any) {
      setError(error.message);
      setIsPending(false);
      console.log(error);
    }
  };
  return { isPending, error, logout };
};

export default Logout;
