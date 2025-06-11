import { IoCart, IoCartOutline } from 'react-icons/io5';
import styles from './CartIcon.module.css';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router';

const CartIcon = () => {
  const { items } = useAppSelector((state) => state.cart);

  const navigate = useNavigate();

  const numItem: number =
    items.length === 0 ? 0 : items.reduce((a, c) => a + c.quantity, 0);

  return (
    <div className={styles['cart']} onClick={() => navigate('/cart')}>
      {numItem === 0 ? (
        <IoCartOutline className={styles['nav-icon']} />
      ) : (
        <IoCart className={styles['nav-icon']} />
      )}
      <span className={styles['cart-quantity']}>{numItem}</span>
    </div>
  );
};

export default CartIcon;
