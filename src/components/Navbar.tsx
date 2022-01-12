import { Link } from 'react-router-dom';
import logo from '../assets/jungle-green.png';
import useLogout from '../hooks/useLogout';
import useAuthContext from './../hooks/useAuthContext';
import AsyncButton from './AsyncButton';

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className='navbar bg-primary'>
      <ul>
        <li className='navbar-brand'>
          <Link to='/'>
            <h4 className='navbar-text text-white'>Indoor Jungle</h4>
            <img className='bg-black' src={logo} alt='jungle' />
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
            <AsyncButton label='Logout' isPending={isPending} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
