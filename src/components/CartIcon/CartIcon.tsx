import { IoCart, IoCartOutline } from 'react-icons/io5';
import styles from './CartIcon.module.css';
import { useAppSelector } from '../../app/hooks';

const CartIcon = () => {
  const { items } = useAppSelector((state) => state.cart);

  const numItem: number =
    items.length === 0 ? 0 : items.reduce((a, c) => a + c.quantity, 0);
  // if (items.length === 0) {
  //   numItem = 0;
  // } else {
  //   numItem = items.reduce((a, c) => a + c.quantity, 0);
  // }

  return (
    <div className={styles['cart']}>
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
