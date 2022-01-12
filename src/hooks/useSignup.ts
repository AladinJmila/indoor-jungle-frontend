import { useState, useEffect } from 'react';
import useAuthContext from './useAuthContext';
import { projectAuth } from './../firebase/config';
import { login } from '../context/AuthContext';

const useSignup = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatchAuth } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
      const { user } = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!user) throw new Error('Could not signup user');

      await user.updateProfile({ displayName });

      login.payload = user;
      dispatchAuth(login);

      if (!isCanceled) setIsPending(false);
    } catch (error: any) {
      if (!isCanceled) {
        setError(error.message);
        setIsPending(false);
        console.log(error);
      }
    }
  };
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { isPending, error, signup };
};

export default useSignup;
