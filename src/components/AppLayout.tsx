import { Outlet } from 'react-router';
import NavBar from './NavBar/NavBar';


const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <footer>footer</footer>
    </>
  );
};

export default AppLayout;
