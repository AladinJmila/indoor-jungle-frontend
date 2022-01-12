import { useState } from 'react';
import useLogin from './../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className='auth-form bg-white' onSubmit={handleSubmit}>
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
      <button className='center-self btn-outlined-secondary bg-hover-secondary text-hover-white '>
        Login
      </button>
    </form>
  );
};

export default Login;
