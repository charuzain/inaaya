import type { Sizekey } from '../../types/cartItem';
import styles from './SizeSelector.module.css';

interface SizeSelector {
  sizes: Record<Sizekey, number>;
  onSelect: (size: Sizekey) => void;
}

const SizeSelector = ({ sizes, onSelect }: SizeSelector) => {
  return (
    <div className={styles['size-options']}>
      <span>Size</span>
      <div className={styles['btn-list']}>
        {(Object.keys(sizes) as Sizekey[]).map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={styles['size-button']}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
