import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link } from 'react-router';
import styles from './CartPage.module.css';
import { removeFromCart } from '../slice/cartSlice';

const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  console.log(items.length);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return <p>There is not item in your bag !!</p>;
  }

  return (
    <div className={styles['cart-page-container']}>
      <h1 className={styles['cart-title']}>My Bag(10 Items)</h1>
      <p className={styles['cart-total']}>Est- Order Total - CA $250</p>
      <div className={styles['cart-container']}>
        <section className={styles['cart-item-section']}>
          <ul className={styles['cart-list']}>
            {items.map((product) => (
              <li key={product.id} className={styles['cart-item']}>
                <div className={styles['item-image-container']}>
                  <img
                    src={`/src${product.image}`}
                    alt={product.name}
                    className={styles['item-image']}
                  />
                </div>
                <div className={styles['item-details']}>
                  <div>
                    <p className={styles['item-name']}>{product.name}</p>
                    {/* <p className={styles['item-id']}>{`#ID${product.id}`}</p> */}
                    <p className={styles['item-size']}>
                      Size: {product.size.toUpperCase()}
                    </p>
                  </div>
                  <div className={styles['item-action']}>
                    <button className={styles['action-btn']}>
                      Save for Later
                    </button>
                  </div>
                </div>

                <div className={styles['btn-container']}>
                  <button className={styles['increase-btn']}> - </button>
                  <span>{product.quantity}</span>
                  <button className={styles['decrease-btn']}>+</button>
                </div>

                <div
                  className={styles['item-price']}
                >{`$ ${product.price} each`}</div>

                <div className={styles['item-price']}>{`$ ${(
                  product.price * product.quantity
                ).toFixed(2)}`}</div>
                <button
                  className={styles['remove-btn']}
                  onClick={() =>
                    dispatch(
                      removeFromCart({ id: product.id, size: product.size })
                    )
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles['summary-section']}>
          <h2 className={styles['summary-title']}>Order Summary</h2>
        </section>
      </div>
    </div>
  );
};

export default CartPage;
