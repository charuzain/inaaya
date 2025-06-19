import { Outlet } from 'react-router';
import NavBar from './NavBar/NavBar';
import styles from './AppLayout.module.css';
import Footer from './Footer/Footer';

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <div className={styles['outlet-wrapper']}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
