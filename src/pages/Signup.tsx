import useSignup from './../hooks/useSignup';
import { useState } from 'react';
import AsyncButton from '../components/AsyncButton';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const { signup, isPending, error } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(email, password, displayName);
  };

  return (
    <form className='auth-form bg-white' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
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
      <label>
        <span>diplay name:</span>
        <input
          type='text'
          required
          onChange={e => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <AsyncButton label='Signup' isPending={isPending} />
      {error && <p className='text-error mt-1'>{error}</p>}
    </form>
  );
};

export default Signup;
