import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateProducts } from '../../slice/productSlice';
import styles from './OrderSummary.module.css';

const OrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.cart);

  const placeOrderHandler = async () => {
    try {
      const res = await dispatch(updateProducts()).unwrap();
      console.log(res);
      navigate('/confirmation', { replace: true });
    } catch (error) {
      console.error('Order failed:', error);
    }
  };
  // When we navigate with { replace: true }, the current entry in the browser's history stack is replaced with the new location, rather than pushing a new entry onto the stack. This means that when the user presses the browser's back button, they won't go back to the checkout page; instead, they will go to the page before the checkout page (product listing).

  const subTotal: number =
    items.length > 0 ? items.reduce((a, c) => a + c.quantity * c.price, 0) : 0;
  const calculatedTaxes: number = (13 * subTotal) / 100;
  const orderTotal: number = subTotal + calculatedTaxes;

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
      <button onClick={() => placeOrderHandler()}>Place Order</button>
    </section>
  );
};

export default OrderSummary;
