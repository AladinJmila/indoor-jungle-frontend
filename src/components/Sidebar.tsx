import collectionIcon from '../assets/collection_icon.svg';
import addIcon from '../assets/add_icon.svg';
import utilitiesIcon from '../assets/utilities_icon.svg';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <p>Hey Dudi</p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink to='/'>
                <img src={collectionIcon} alt='collection icon' />
                <span>Collection</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <img src={addIcon} alt='add icon' />
                <span>New Plant</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/utilities'>
                <img src={utilitiesIcon} alt='utilities icon' />
                <span>Utilities</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
