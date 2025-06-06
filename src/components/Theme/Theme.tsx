import { FaMoon } from 'react-icons/fa';
import { FaRegMoon } from 'react-icons/fa6';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setTheme } from '../../slice/themeSlice';
import styles from './Theme.module.css';

const Theme = () => {
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
    <div onClick={themeHandler}>
      {theme === 'light' ? (
        <FaMoon className={styles['nav-icon']} />
      ) : (
        <FaRegMoon className={styles['nav-icon']} />
      )}
    </div>
  );
};

export default Theme;
