import { IoCart, IoCartOutline } from 'react-icons/io5';
import styles from './CartIcon.module.css';

const CartIcon = () => {
  const numItem: number = 0;
  return (
    <div className={styles['cart']}>
      {numItem === 0 ? (
        <IoCartOutline className={styles['nav-icon']} />
      ) : (
        <IoCart className={styles['nav-icon']} />
      )}
      <span className={styles['cart-quantity']}>1</span>
    </div>
  );
};

export default CartIcon;
