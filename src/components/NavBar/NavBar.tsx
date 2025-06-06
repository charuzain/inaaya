import CartIcon from '../CartIcon/CartIcon';
import FavuoriteIcon from '../FaviroteIcon/FavuoriteIcon';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import Theme from '../Theme/Theme';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles['header-container']}>
      <header className={`wrapper ${styles['header']}`}>
        <div className={styles['logo-box']}>
          <span className={styles['brand-name']}>Inaaya</span>
          <span className={styles['circle']}></span>
        </div>
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
