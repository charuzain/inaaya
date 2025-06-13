import CartIcon from '../CartIcon/CartIcon';
import FavuoriteIcon from '../FaviroteIcon/FavuoriteIcon';
import Logo from '../Logo/Logo';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import Theme from '../Theme/Theme';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles['header-container']}>
      <header className={`wrapper ${styles['header']}`}>
        <Logo />
        <NavigationLinks />
        <div className={styles['nav-icons']}>
          <Theme />
          <CartIcon />
          <FavuoriteIcon />
        </div>
      </header>
    </div>
  );
};

export default NavBar;
