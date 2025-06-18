import { useAppDispatch, useAppSelector } from '../app/hooks';
import styles from './CartPage.module.css';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../slice/cartSlice';
import { numItem } from '../selectors/cartSelector';

import { RiDeleteBin2Line } from 'react-icons/ri';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import EmptyCart from '../components/EmptyCart/EmptyCart';

const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { status } = useAppSelector((state) => state.product);
  const totalNumItem = useAppSelector(numItem);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  if (status === 'loading') {
    return <h1>Updating stock....</h1>;
  }

  return (
    <>
      <div className={styles['cart-page-container']}>
        <h1 className={styles['cart-title']}>My Bag({totalNumItem})</h1>
        {/* <p className={styles['cart-total']}>Est- Order Total - CA $250</p> */}
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
                  {/* buttons */}
                  <div className={styles['btn-container']}>
                    <button
                      className={styles['increase-btn']}
                      onClick={() =>
                        dispatch(
                          decreaseQuantity({
                            id: product.id,
                            size: product.size,
                          })
                        )
                      }
                    >
                      {product.quantity === 1 ? (
                        <RiDeleteBin2Line className={styles['delete-icon']} />
                      ) : (
                        '-'
                      )}
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      className={styles['decrease-btn']}
                      onClick={() =>
                        dispatch(
                          increaseQuantity({
                            id: product.id,
                            size: product.size,
                          })
                        )
                      }
                    >
                      +
                    </button>
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
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default CartPage;
