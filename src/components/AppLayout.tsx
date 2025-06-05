import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <>
      <header>Header</header>
      <Outlet />
      <footer>footer</footer>
    </>
  );
};

export default AppLayout;
