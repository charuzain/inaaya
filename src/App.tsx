import './index.css';
import AppLayout from './components/AppLayout';
import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import OrderConfirmationPage from './pages/OrderConfirmationPage/OrderConfirmationPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/confirmation',
        element: <OrderConfirmationPage />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetailPage />,
      },
    ],
  },
]);

function App() {
  const { theme } = useAppSelector((state) => state.theme);
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);
  return <RouterProvider router={router} />;
}

export default App;
