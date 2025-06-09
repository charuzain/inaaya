import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { Size } from '../../slice/productSlice';

import { clearSelectedProduct } from '../../slice/productSlice';

// css
import styles from './QuickShop.module.css';

const QuickShop = () => {
  const { selectedProduct } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const closeIconHandler = () => {
    setStock(null);
    dispatch(clearSelectedProduct());
  };

  const [stock, setStock] = useState<number | null>(null);

  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [sizeSelected, setSizeSelected] = useState<boolean>(false);
  const increaseQtyHandler = (): void => {
    setSelectedQty(selectedQty + 1);
  };

  const decreaseQtyHandler = (): void => {
    if (selectedQty > 1) {
      setSelectedQty(selectedQty - 1);
    }
  };

  const showStock = (key: keyof Size): void => {
    if (!selectedProduct) {
      return;
    }
    const quantity: number = selectedProduct?.sizes[key];
    setStock(quantity);
    setSelectedQty(1);
    setSizeSelected(true);
  };

  console.log('====');
  console.log(`stock is ${stock}`);
  console.log(`selectedQty is ${selectedQty}`);
  console.log(`sizeSelected is ${sizeSelected}`);

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
          {/* <div className={styles['product-details']}> */}
          <h1 className={styles['product-name']}>{selectedProduct.name}</h1>
          <p className={styles['product-price']}>${selectedProduct.price}</p>
          {/* </div> */}

          <div className={styles['size-options']}>
            <span>Size</span>
            <div className={styles['btn-list']}>
              {(Object.keys(selectedProduct.sizes) as (keyof Size)[]).map(
                (size) => (
                  <button
                    key={size}
                    onClick={() => showStock(size)}
                    className={styles['size-button']}
                  >
                    {size.toUpperCase()}
                  </button>
                )
              )}
            </div>
            <div>
              <span className={styles['stock-status']}>
                {stock !== null &&
                  (stock !== 0 ? 'Available' : 'Size Not Available')}
              </span>
              {stock !== null && stock !== 0 && (
                <p className={styles['stock-count']}>
                  {stock} item(s) available in selected size
                </p>
              )}
            </div>
          </div>

          {/* buttons */}
          {stock === 0 ? (
            <span></span>
          ) : (
            <div className={styles['action-buttons']}>
              <button
                className={styles['decrease-button']}
                onClick={decreaseQtyHandler}
              >
                -
              </button>

              <span className={styles['quantity']}>{selectedQty}</span>
              <button
                className={styles['add-button']}
                onClick={increaseQtyHandler}
                disabled={selectedQty === stock}
              >
                +
              </button>
            </div>
          )}

          {/* Add to cart button */}
          <div className={styles['btn-wrapper']}>
            {!sizeSelected && (
              <span className={styles['btn-msg']}>Select a size to add</span>
            )}
            <button
              className={styles['btn']}
              disabled={!sizeSelected || stock === 0}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickShop;
