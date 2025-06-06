import { Outlet } from 'react-router';
import NavBar from './NavBar/NavBar';

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <Outlet />
      </div>
      <footer>footer</footer>
    </>
  );
};

export default AppLayout;
