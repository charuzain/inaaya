import { useAppDispatch } from '../../app/hooks';
import { updateProducts } from '../../slice/productSlice';
import styles from './OrderSummary.module.css';

const OrderSummary = () => {
  const dispatch = useAppDispatch();
  return (
    <section className={styles['summary-section']}>
      <h2 className={styles['summary-title']}>Order Summary</h2>
      <div className={styles['order-detail']}>
        <p>Subtotal</p>
        <p>$123</p>
      </div>
      <div className={styles['order-detail']}>
        <p>Shipping</p>
        <p>$10</p>
      </div>
      <div className={styles['order-detail']}>
        <p>Taxes(13%)</p>
        <p>$124</p>
      </div>
      <div className={styles['order-detail']}>
        <p> Order Total</p>
        <p>CA $2342.32</p>
      </div>
      <button onClick={() => dispatch(updateProducts())}>Place Order</button>
    </section>
  );
};

export default OrderSummary;
