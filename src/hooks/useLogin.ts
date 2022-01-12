import { useEffect, useState } from 'react';
import useAuthContext from './useAuthContext';
import { projectAuth } from './../firebase/config';
import { loginAction } from '../context/AuthContext';

const useLogin = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { authDispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const user = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!user) throw new Error('Could not login user');

      loginAction.payload = user;

      if (!isCanceled) {
        setIsPending(false);
        authDispatch(loginAction);
      }
    } catch (error: any) {
      if (!isCanceled) {
        setError(error.message);
        setIsPending(false);
        console.log(error);
      }
    }

    useEffect(() => {
      return setIsCanceled(true);
    }, []);
  };

  return { isPending, error, login };
};

export default useLogin;
