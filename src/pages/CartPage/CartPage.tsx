import { useAppSelector } from '../../app/hooks';
import styles from './CartPage.module.css';
import { numItem } from '../../selectors/cartSelector';

import OrderSummary from '../../components/OrderSummary/OrderSummary';
import EmptyCart from '../../components/EmptyCart/EmptyCart';
import CartItem from '../../components/CartItem/CartItem';
import type { CartItemType } from '../../types/cartItem';
import SavedForLater from '../../components/SavedForLater/SavedForLater';
import type { RootState } from '../../app/store';

const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  const numSavedProducts = useAppSelector(
    (state: RootState) => state.savedProduct.savedProducts.length
  );

  const { status } = useAppSelector((state) => state.product);
  const totalNumItem = useAppSelector(numItem);

  // if (items.length === 0) {
  //   return <EmptyCart />;
  // }

  if (status === 'loading') {
    return <h1>Updating stock....</h1>;
  }

  return (
    <main>
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className={styles['cart-page-container']}>
          <h1 className={styles['cart-title']}>My Bag({totalNumItem})</h1>
          {/* <p className={styles['cart-total']}>Est- Order Total - CA $250</p> */}
          <div className={styles['cart-container']}>
            <section className={styles['cart-item-section']}>
              <ul className={styles['cart-list']}>
                {items.map((product: CartItemType) => (
                  <CartItem
                    product={product}
                    key={`${product.id}-${product.size}`}
                  />
                ))}
              </ul>
            </section>
            <OrderSummary />
          </div>
        </div>
      )}
      {/* SavedForLaterPage */}
      {numSavedProducts > 0 && (
        <section>
          <SavedForLater />
        </section>
      )}
    </main>
  );
};

export default CartPage;
