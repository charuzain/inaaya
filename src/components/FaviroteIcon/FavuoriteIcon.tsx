import { GoHeart, GoHeartFill } from 'react-icons/go';
import styles from './Favuorite.module.css';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';

const FavuoriteIcon = () => {
  const navigate = useNavigate();
  const numOfFavProduct = useAppSelector(
    (state: RootState) => state.favorite.favoriteProducts.length
  );
  return (
    <div onClick={() => navigate('favorite')}>
      {numOfFavProduct === 0 ? (
        <GoHeart className={styles['nav-icon']} />
      ) : (
        <GoHeartFill className={styles['nav-icon']} />
      )}
    </div>
  );
};

export default FavuoriteIcon;
