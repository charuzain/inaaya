import { IoCart, IoCartOutline } from 'react-icons/io5';
import styles from './CartIcon.module.css';

const CartIcon = () => {
  const numItem: number = 0;
  return (
    <div>
      {numItem === 0 ? (
        <IoCartOutline className={styles['nav-icon']} />
      ) : (
        <IoCart className={styles['nav-icon']} />
      )}
    </div>
  );
};

export default CartIcon;
