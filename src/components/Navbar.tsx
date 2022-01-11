import { Link } from 'react-router-dom';
import logo from '../assets/jungle-green.png';

const Navbar = () => {
  return (
    <div className='navbar bg-primary'>
      <ul>
        <li className='navbar-brand text-pink-light-5'>
          <Link to='/'>
            <img src={logo} alt='jungle' />
            <h3 className='navbar-text bg-black'>Indoor Jungle</h3>
          </Link>
        </li>
        <li className='text-white'>
          <Link to='/login'>Login</Link>
        </li>
        <li className='text-white'>
          <Link to='/signup'>Signup</Link>
        </li>
        <li>
          <button className='btn mr-2'>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
