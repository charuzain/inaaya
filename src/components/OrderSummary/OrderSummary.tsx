import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateProducts } from '../../slice/productSlice';
import styles from './OrderSummary.module.css';

const OrderSummary = () => {
  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.cart);

  const subTotal: number =
    items.length > 0 ? items.reduce((a, c) => a + c.quantity * c.price, 0) : 0;
  const calculatedTaxes: number = (13 * subTotal) / 100;
  const orderTotal: number = subTotal + calculatedTaxes;

  console.log(subTotal);

  return (
    <section className={styles['summary-section']}>
      <h2 className={styles['summary-title']}>Order Summary</h2>
      <div className={styles['order-detail']}>
        <p>Subtotal</p>
        <p>${subTotal.toFixed(2)}</p>
      </div>
      <div className={styles['order-detail']}>
        <p>Shipping</p>
        <p>$10</p>
      </div>
      <div className={styles['order-detail']}>
        <p>Taxes(13%)</p>
        <p>${calculatedTaxes.toFixed(2)}</p>
      </div>
      <div className={styles['order-detail']}>
        <p> Order Total</p>
        <p>CA ${orderTotal.toFixed(2)}</p>
      </div>
      <button onClick={() => dispatch(updateProducts())}>Place Order</button>
    </section>
  );
};

export default OrderSummary;
