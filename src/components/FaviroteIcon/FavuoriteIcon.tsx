import { GoHeart, GoHeartFill } from 'react-icons/go';
import styles from './Favuorite.module.css';


const FavuoriteIcon = () => {
  const numLikes = 0;
  return <div>{numLikes === 0 ? <GoHeart className={styles['nav-icon']} /> : <GoHeartFill />}</div>;
};

export default FavuoriteIcon;
