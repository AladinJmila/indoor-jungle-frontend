const Signup = () => {
  return (
    <form className='auth-form bg-white'>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input type='email' />
      </label>
      <label>
        <span>password:</span>
        <input type='password' />
      </label>
      <label>
        <span>diplay name:</span>
        <input type='text' />
      </label>
      <button className='center-self btn-outlined-secondary bg-hover-secondary text-hover-white '>
        Sign up
      </button>
    </form>
  );
};

export default Signup;
