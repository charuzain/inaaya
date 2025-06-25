import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import { useNavigate } from 'react-router';
import styles from './FavoritePage.module.css';
import { GoHeartFill } from 'react-icons/go';
import { removeFromWishList } from '../../slice/favoriteSlice';

const FavoritePage = () => {
  const favorite = useAppSelector(
    (state: RootState) => state.favorite.favoriteProducts
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (favorite.length === 0) {
    const continueHandler = () => {
      navigate('/products');
    };
    return (
      <>
        <h1>My wishlist</h1>
        <p>Your wishlist is empty</p>
        <p>
          My Wishlist allows you to keep track of all of your favorites and
          shopping activity whether you're on your computer, phone, or tablet.
          You won't have to waste time searching all over again for that item
          you loved on your phone the other day - it's all here in one place!
        </p>
        <div>
          <button onClick={continueHandler}>Continue Shopping</button>
        </div>
      </>
    );
  }
  return (
    <main>
      <h1>My Wishlist</h1>
      <section className={styles['list-wrapper']}>
        {favorite.map((product) => (
          <article
            key={product.id}
            className={styles['product-card']}
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
          >
            <GoHeartFill
              className={styles['favourite-icon']}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeFromWishList(product.id));
              }}
            />
            <div className={styles['image-container']}>
              <img
                src={`/src${product.image} `}
                alt={product.name}
                className={styles['product-image']}
              />
              <button
                className={styles['btn']}
                onClick={() => {
                  navigate(`/products/${product.id}`);
                }}
              >
                View Details
              </button>
            </div>
            <p className={styles['product-title']}>{product.name}</p>
            <p className={styles['product-price']}>{`$${product.price}`}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default FavoritePage;
