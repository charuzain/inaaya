import { Outlet } from 'react-router';
import NavBar from './NavBar/NavBar';
import styles from './AppLayout.module.css';

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <div className={styles['outlet-wrapper']}>
        <Outlet />
      </div>
      <footer>footer</footer>
    </>
  );
};

export default AppLayout;
