import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchProducts,
  setSelectedProduct,
} from '../../slice/productSlice';
import { GoHeart, GoHeartFill } from 'react-icons/go';

import styles from './ProductList.module.css';
import QuickShop from '../QuickShop/QuickShop';
const ProductList = () => {

  const {products, status, selectedProduct } = useAppSelector(
    (state) => state.product
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
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
      {selectedProduct && <QuickShop/>}
    </>)
}

export default ProductList;
