import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../slice/productSlice';
import styles from './ProductList.module.css';
const ProductList = () => {
  const { error, products, status } = useAppSelector((state) => state.product);
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
          <div className={styles['image-container']}>
            <img
              src={`/src${product.image} `}
              alt={product.name}
              className={styles['product-image']}
            />
          </div>
          <p className={styles['product-title']}>{product.name}</p>
          <p className={styles['product-price']}>{`$${product.price}`}</p>
        </article>
      ))}
    </>
  );
};

export default ProductList;
