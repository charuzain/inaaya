import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearQuickViewProduct,
  fetchProducts,
  setQuickViewProduct,
} from '../../slice/productSlice';
import { GoHeart, GoHeartFill } from 'react-icons/go';

import styles from './ProductList.module.css';
import QuickShop from '../QuickShop/QuickShop';
import type { RootState } from '../../app/store';
import { filteredProduct } from '../../selectors/filterSelector';
import NoProductMessage from '../NoProductMessage/NoProductMessage';
import { useNavigate } from 'react-router';
import { addToWishlist, removeFromWishList } from '../../slice/favoriteSlice';
import type { Root } from 'react-dom/client';
const ProductList = () => {
  const { status, quickViewProduct } = useAppSelector(
    (state: RootState) => state.product
  );

  const favorites = useAppSelector(
    (state: RootState) => state.favorite.favoriteProducts
  );

  const isFavorite = (id: number): boolean =>
    favorites.some((favoriteProduct) => favoriteProduct.id === id);

  const productList = useAppSelector(filteredProduct);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading....</p>;
  }
  if (status === 'failed') {
    return <p>Error...</p>;
  }

  if (productList.length === 0) {
    return <NoProductMessage />;
  }
  return (
    <>
      {productList.map((product) => (
        <article
          key={product.id}
          className={styles['product-card']}
          onClick={() => {
            dispatch(clearQuickViewProduct());
            navigate(`/products/${product.id}`);
          }}
        >
          {isFavorite(product.id) ? (
            <GoHeartFill
              className={styles['favourite-icon']}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeFromWishList(product.id));
              }}
            />
          ) : (
            <GoHeart
              className={styles['favourite-icon']}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToWishlist(product));
              }}
            />
          )}
          <div className={styles['image-container']}>
            <img
              src={`/src${product.image} `}
              alt={product.name}
              className={styles['product-image']}
            />
            <button
              className={styles['view-btn']}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setQuickViewProduct(product));
              }}
            >
              Quick View
            </button>
          </div>
          <p className={styles['product-title']}>{product.name}</p>
          <p className={styles['product-price']}>{`$${product.price}`}</p>
        </article>
      ))}
      {quickViewProduct && <QuickShop />}
    </>
  );
};

export default ProductList;
