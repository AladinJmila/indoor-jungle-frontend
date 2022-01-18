import { Link } from 'react-router-dom';
import logo from '../assets/plant_icon.svg';
import useLogout from '../hooks/useLogout';
import useAuthContext from './../hooks/useAuthContext';
import AsyncButtonWithFunc from './AsyncButtonWithFunc';
import { logoutAction } from './../context/AuthContext';

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
          <li className='mr-2'>
            <AsyncButtonWithFunc
              label='Logout'
              isPending={isPending}
              handler={logout}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
