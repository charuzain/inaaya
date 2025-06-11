import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { CartItem, Sizekey } from '../../types/cartItem';
import { clearSelectedProduct } from '../../slice/productSlice';
import { addToCart } from '../../slice/cartSlice';

// css
import styles from './QuickShop.module.css';

const QuickShop = () => {
  const [selectedSize, setSelectedSize] = useState<Sizekey | null>(null);
  const [selectedQty, setSelectedQty] = useState<number>(1);

  const { selectedProduct  } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const stock = selectedSize ? selectedProduct?.sizes[selectedSize] ?? 0 : 0;

  const cartItems: CartItem | undefined = useAppSelector((state) =>
    state.cart.items.find(
      (item) => item.id === selectedProduct.id && item.size === selectedSize
    )
  );

  let alreadyInCart: number;

  if (cartItems) {
    alreadyInCart = cartItems.quantity;
  } else {
    alreadyInCart = 0;
  }

  const availableStock = stock - alreadyInCart;
  // if (stock <= selectedQty + alreadyInCart) {
  //   setSelectedQty(0);
  // }
  const closeIconHandler = () => {
    dispatch(clearSelectedProduct());
  };

  const increaseQtyHandler = (): void => {
    setSelectedQty(selectedQty + 1);
  };

  const decreaseQtyHandler = (): void => {
    if (selectedQty > 1) {
      setSelectedQty(selectedQty - 1);
    }
  };

  const showStock = (key: Sizekey): void => {
    setSelectedSize(key);
    setSelectedQty(1);
  };

  const addToCartHandler = () => {
    if (!selectedSize || !stock || !selectedProduct) {
      return;
    }

    if (selectedQty > availableStock) {
      return;
    }
    dispatch(
      addToCart({
        id: selectedProduct?.id,
        name: selectedProduct?.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        size: selectedSize,
        quantity: selectedQty,
        stock: stock,
      })
    );
    dispatch(clearSelectedProduct());
  };

  // console.log('====');
  // console.log(`stock is ${stock}`);
  // console.log(`selectedQty is ${selectedQty}`);
  // console.log(`sizeSelected is ${sizeSelected}`);

  if (!selectedProduct) return null;

  return (
    <section className={styles['overlay']}>
      <div className={styles['modal']}>
        <button className={styles['close-icon']} onClick={closeIconHandler}>
          X
        </button>
        <h2 className={styles['title']}>Quick Shop</h2>

        <div className={styles['product-preview']}>
          <div className={styles['image-wrapper']}>
            <img
              src={`/src${selectedProduct.image}`}
              alt={selectedProduct.name}
              className={styles['product-image']}
            />
          </div>
          <div className={styles['product-meta']}>
            <span
              className={styles['product-id']}
            >{`#${selectedProduct.id}`}</span>
            <a href="#" className={styles['details-link']}>
              View Full Details
            </a>
          </div>
        </div>

        <div className={styles['product-info']}>
          <h1 className={styles['product-name']}>{selectedProduct.name}</h1>
          <p className={styles['product-price']}>${selectedProduct.price}</p>
          <div className={styles['size-options']}>
            <span>Size</span>
            <div className={styles['btn-list']}>
              {(Object.keys(selectedProduct.sizes) as Sizekey[]).map((size) => (
                <button
                  key={size}
                  onClick={() => showStock(size)}
                  className={styles['size-button']}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
            <div>
              <span className={styles['stock-status']}>
                {/* if size is selected display show available or not  */}
                {selectedSize &&
                  (stock !== 0 ? 'Available' : 'Size Not Available')}
              </span>
              {selectedSize && stock !== 0 && (
                <p className={styles['stock-count']}>
                  {stock} item(s) available in selected size .
                  {alreadyInCart > 0 && availableStock > 0 && (
                    <span>
                      {' '}
                      {`You already have ${alreadyInCart} item(s) in cart.`}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* buttons */}
          {selectedSize && stock === 0 && <span>Out of Stock</span>}
          {selectedSize && stock !== 0 && availableStock <= 0 && (
            <span>
              You already added all available stock of selected size to cart.
            </span>
          )}

          {selectedSize && stock > 0 && availableStock > 0 && (
            <div className={styles['action-buttons']}>
              <button
                className={styles['decrease-button']}
                onClick={decreaseQtyHandler}
                disabled={!selectedSize || selectedQty === 1}
              >
                -
              </button>

              <span className={styles['quantity']}>{selectedQty}</span>
              <button
                className={styles['add-button']}
                onClick={increaseQtyHandler}
                disabled={
                  selectedQty === stock ||
                  !selectedSize ||
                  stock <= selectedQty + alreadyInCart
                }
              >
                +
              </button>
            </div>
          )}

          {/* Add to cart button */}
          <div className={styles['btn-wrapper']}>
            {!selectedSize && (
              <span className={styles['btn-msg']}>Select a size to add</span>
            )}
            <button
              className={styles['btn']}
              disabled={!selectedSize || stock === 0}
              onClick={addToCartHandler}
            >
              {selectedSize && stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickShop;
