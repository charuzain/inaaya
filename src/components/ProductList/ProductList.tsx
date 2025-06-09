import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearSelectedProduct,
  fetchProducts,
  setSelectedProduct,
} from '../../slice/productSlice';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import type { Size } from '../../slice/productSlice';

import styles from './ProductList.module.css';
const ProductList = () => {
  const { error, products, status, selectedProduct } = useAppSelector(
    (state) => state.product
  );

  const [stock, setStock] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const showStock = (key: keyof Size): void => {
    if (!selectedProduct) {
      return;
    }
    const quantity: number = selectedProduct?.sizes[key];
    setStock(quantity);
  };

  if (status === 'loading') {
    return <p>Loading....</p>;
  }
  if (status === 'failed') {
    return <p>Error...</p>;
  }
  return (
    <>
      {products.map((product) => (
        <article key={product.id} className={styles['product-card']}>
          <GoHeart className={styles['favourite-icon']} />
          <div className={styles['image-container']}>
            <img
              src={`/src${product.image} `}
              alt={product.name}
              className={styles['product-image']}
            />
            <button
              className={styles['view-btn']}
              onClick={() => dispatch(setSelectedProduct(product))}
            >
              Quick View
            </button>
          </div>
          <p className={styles['product-title']}>{product.name}</p>
          <p className={styles['product-price']}>{`$${product.price}`}</p>
        </article>
      ))}
      {selectedProduct && (
        <section className={styles['overlay']}>
          <div className={styles['modal']}>
            <button
              className={styles['close-icon']}
              onClick={() => dispatch(clearSelectedProduct())}
            >
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

            <div>
              <div className={styles['product-info']}>
                <h1 className={styles['product-name']}>
                  {selectedProduct.name}
                </h1>
                <p className={styles['product-price']}>
                  {selectedProduct.price}
                </p>
              </div>

              <div className={styles['size-options']}>
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

              <p className={styles['stock-status']}>
                {stock !== null &&
                  (stock !== 0 ? 'Available' : 'Not Available')}
              </p>

              {stock !== null && stock !== 0 && (
                <span className={styles['stock-count']}>{stock}</span>
              )}

              <div className={styles['action-buttons']}>
                <button className={styles['quantity-button']}>-</button>
                <button className={styles['add-button']} disabled={stock === 0}>
                  {stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                </button>
                <button className={styles['quantity-button']}>+</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductList;
