import { Link } from 'react-router-dom';
import logo from '../assets/plant_icon.svg';
import useLogout from '../hooks/useLogout';
import useAuthContext from './../hooks/useAuthContext';

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <Link to='/'>
            <img src={logo} alt='jungle' />
            <span>Indoor Jungle</span>
          </Link>
        </li>

        {!user && (
          <>
            <li className='text-white'>
              <Link to='/login'>Login</Link>
            </li>
            <li className='text-white'>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button
                className='btn-outlined-secondary bg-hover-secondary text-hover-white mr-2'
                onClick={logout}
              >
                Logout
              </button>
            )}
            {isPending && (
              <button
                className='btn-outlined-secondary bg-hover-secondary text-hover-white mr-2'
                disabled
              >
                Loading...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
