import useSignup from './../hooks/useSignup';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const { signup } = useSignup();

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
      <button className='center-self btn-outlined-secondary bg-hover-secondary text-hover-white '>
        Sign up
      </button>
    </form>
  );
};

export default Signup;
