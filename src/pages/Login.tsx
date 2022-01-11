const Login = () => {
  return (
    <form className='auth-form bg-white'>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input type='email' />
      </label>
      <label>
        <span>password:</span>
        <input type='password' />
      </label>
      <button className='center-self btn-outlined-secondary bg-hover-secondary text-hover-white '>
        Login
      </button>
    </form>
  );
};

export default Login;
