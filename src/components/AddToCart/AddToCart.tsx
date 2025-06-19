import {
  useAddToCart,
  type AddToCartHadlerProps,
} from '../../hooks/useAddToCart';
import styles from './AddToCart.module.css';

const AddToCart = ({
  selectedSize,
  stock,
  availableStock,
  selectedQty,
  onAddSuccess,
}: AddToCartHadlerProps) => {
  const { addToCartHandler } = useAddToCart();
  return (
    <div className={styles['btn-wrapper']}>
      {!selectedSize && (
        <span className={styles['btn-msg']}>Select a size to add</span>
      )}

      <button
        className={styles['btn']}
        disabled={!selectedSize || stock === 0 || availableStock === 0}
        onClick={() =>
          addToCartHandler({
            selectedSize,
            stock,
            selectedQty,
            availableStock,
            onAddSuccess,
          })
        }
      >
        {selectedSize && stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default AddToCart;
