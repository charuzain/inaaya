import { useState } from 'react';
import {
  useAddToCart,
  type AddToCartHadlerProps,
} from '../../hooks/useAddToCart';
import styles from './AddToCart.module.css';
import AddToCartModal from '../AddToCartModal/AddToCartModal';

const AddToCart = ({
  selectedSize,
  stock,
  availableStock,
  selectedQty,
  onModalClose,
}: AddToCartHadlerProps) => {
  const { addToCartHandler } = useAddToCart();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
              onAddSuccess: () => {
                setShowModal(true);
              },
            })
          }
        >
          {selectedSize && stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
      {showModal && (
        <AddToCartModal
          onClose={() => {
            setShowModal(false);
            onModalClose?.();
          }}
          selectedSize={selectedSize}
          selectedQty={selectedQty}
        />
      )}
    </>
  );
};

export default AddToCart;
