import { useNavigate } from 'react-router';
import styles from './AddToCartModal.module.css';
import type { Product } from '../../slice/productSlice';
import { useAppSelector } from '../../app/hooks';
import type { Sizekey } from '../../types/cartItem';

type Props = {
  onClose: () => void;
  selectedQty: number;
  selectedSize: Sizekey | null;
};

const AddToCartModal = ({ onClose, selectedQty, selectedSize }: Props) => {
  const navigate = useNavigate();
  const { quickViewProduct, selectedProduct } = useAppSelector(
    (state) => state.product
  );

  const product = quickViewProduct || selectedProduct;

  return (
    <div className={styles['overlay']} onClick={onClose}>
      <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
        <p>{`✅ Product Added to Bag`}</p>
        <div>
          <img src={`/src/${product?.image}`} alt={product?.name} />
        </div>
        <div>
          <p>{product?.name} </p>
          <p>{selectedQty}</p>
          <p>{selectedSize}</p>
        </div>

        <div className={styles['buttons']}>
          <button onClick={onClose} className={styles['buttons']}>
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/cart')}
            className={styles['buttons']}
          >
            View Bag & Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
