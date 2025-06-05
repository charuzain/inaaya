import { FaMoon } from 'react-icons/fa';
import { FaRegMoon } from 'react-icons/fa6';

const NavBar = () => {
  return (
    <header>
      <div>
        <span>Inaaya</span>
        <span></span>
      </div>
      <div>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Shop</li>
        </ul>
      </div>
      <div>
        <FaMoon />
        <FaRegMoon />
      </div>
    </header>
  );
};

export default NavBar;
