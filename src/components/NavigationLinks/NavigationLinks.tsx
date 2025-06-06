import { NavLink } from 'react-router';
import styles from './NavigationLink.module.css';

const NavigationLinks = () => {
  return (
    <nav className={styles['nav']}>
      <ul className={styles['nav-list']}>
        <li className={styles['nav-item']}>
          <NavLink to={'/'} className={styles['nav-link']}>
            Home
          </NavLink>
        </li>
        <li className={styles['nav-item']}>
          <NavLink to={'/about'} className={styles['nav-link']}>
            About Us
          </NavLink>
        </li>
        <li className={styles['nav-item']}>
          <NavLink to={'/products'} className={styles['nav-link']}>
            Shop
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationLinks;
