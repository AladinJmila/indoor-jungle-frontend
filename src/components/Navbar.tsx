import logo from '../assets/jungle-green.png';

const Navbar = () => {
  return (
    <div className='navbar bg-primary'>
      <div className='navbar-brand text-pink-light-5'>
        <img className='navbar-logo-wrap' src={logo} alt='jungle' />
        <h3 className='navbar-text bg-black'>Indoor Jungle</h3>
      </div>
    </div>
  );
};

export default Navbar;
