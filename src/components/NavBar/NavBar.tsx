import { FaMoon } from 'react-icons/fa';
import { FaRegMoon } from 'react-icons/fa6';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setTheme } from '../../slice/themeSlice';

const NavBar = () => {
  const { theme } = useAppSelector((state) => state.theme);
  console.log(theme);

  const dispatch = useAppDispatch();
  const themeHandler = () => {
    if (theme === 'dark') {
      dispatch(setTheme('light'));
    } else {
      dispatch(setTheme('dark'));
    }
  };

  return (
    <header>
      <div>
        <span>Inaaya</span>
        <span></span>
      </div>
      <nav>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Shop</li>
        </ul>
      </nav>
      <button onClick={themeHandler}>
        {theme === 'light' ? <FaMoon /> : <FaRegMoon />}
      </button>
    </header>
  );
};

export default NavBar;
