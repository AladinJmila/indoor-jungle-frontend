import { useState } from 'react';
import AsyncButton from '../components/AsyncButton';
import useLogin from './../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className='form auth-form bg-white' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          type='email'
          required
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type='password'
          required
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <AsyncButton label='Login' isPending={isPending} />
      {error && <p className='text-error mt-1'>{error}</p>}
    </form>
  );
};

export default Login;
