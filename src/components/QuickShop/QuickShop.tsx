import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { CartItem, Sizekey } from '../../types/cartItem';

import { clearQuickViewProduct } from '../../slice/productSlice';

// css
import styles from './QuickShop.module.css';
import { Link } from 'react-router';
import AddToCart from '../AddToCart/AddToCart';
import SizeSelector from '../SizeSelector/SizeSelector';
import QuantityButton from '../QuantityButton/QuantityButton';

const QuickShop = () => {
  const [selectedSize, setSelectedSize] = useState<Sizekey | null>(null);

  const [selectedQty, setSelectedQty] = useState<number>(1);

  const { quickViewProduct } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const stock = selectedSize ? quickViewProduct?.sizes[selectedSize] ?? 0 : 0;

  const cartItems: CartItem | undefined = useAppSelector((state) =>
    state.cart.items.find(
      (item) => item.id === quickViewProduct?.id && item.size === selectedSize
    )
  );

  let alreadyInCart: number;

  if (cartItems) {
    alreadyInCart = cartItems.quantity;
  } else {
    alreadyInCart = 0;
  }

  const availableStock = stock - alreadyInCart;

  const closeIconHandler = () => {
    dispatch(clearQuickViewProduct());
  };

  const increaseQtyHandler = (): void => {
    setSelectedQty(selectedQty + 1);
  };

  const decreaseQtyHandler = (): void => {
    if (selectedQty > 1) {
      setSelectedQty(selectedQty - 1);
    }
  };

  const handleSizeSelect = (size: Sizekey) => {
    setSelectedSize(size);
    setSelectedQty(1);
  };

  if (!quickViewProduct) return null;

  return (
    <section className={styles['overlay']} onClick={closeIconHandler}>
      <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
        <button className={styles['close-icon']} onClick={closeIconHandler}>
          X
        </button>
        <h2 className={styles['title']}>Quick Shop</h2>

        <div className={styles['product-preview']}>
          <div className={styles['image-wrapper']}>
            <img
              src={`/src${quickViewProduct.image}`}
              alt={quickViewProduct.name}
              className={styles['product-image']}
            />
          </div>
          <div className={styles['product-meta']}>
            <span
              className={styles['product-id']}
            >{`#${quickViewProduct.id}`}</span>
            <Link
              to={`/products/${quickViewProduct.id}`}
              className={styles['details-link']}
            >
              View Full Details
            </Link>
          </div>
        </div>

        <div className={styles['product-info']}>
          <h1 className={styles['product-name']}>{quickViewProduct.name}</h1>
          <p className={styles['product-price']}>${quickViewProduct.price}</p>

          <SizeSelector
            sizes={quickViewProduct.sizes}
            onSelect={handleSizeSelect}
          />

          <div>
            <span className={styles['stock-status']}></span>
            {selectedSize && stock !== 0 && (
              <p className={styles['stock-count']}>
                {stock} item(s) available in selected size .
                {alreadyInCart > 0 && availableStock > 0 && (
                  <span>
                    {`You already have ${alreadyInCart} item(s) in cart.`}
                  </span>
                )}
              </p>
            )}
          </div>

          {/* buttons */}
          {selectedSize && stock === 0 && <span>Out of Stock</span>}
          {selectedSize && stock !== 0 && availableStock <= 0 && (
            <span>
              You already added all available stock of selected size to cart.
            </span>
          )}

          {selectedSize && stock > 0 && availableStock > 0 && (
            <QuantityButton
              increaseQtyHandler={increaseQtyHandler}
              decreaseQtyHandler={decreaseQtyHandler}
              selectedQty={selectedQty}
              disableIncrease={
                selectedQty === stock ||
                !selectedSize ||
                stock <= selectedQty + alreadyInCart
              }
              disableDecrease={!selectedSize || selectedQty === 1}
            />
          )}

          {/* Add to cart button */}
          <AddToCart
            selectedSize={selectedSize}
            stock={stock}
            availableStock={availableStock}
            selectedQty={selectedQty}
          />
        </div>
      </div>
    </section>
  );
};

export default QuickShop;
