import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import styles from './CartItem.module.css';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../slice/cartSlice';
import { RiDeleteBin2Line } from 'react-icons/ri';
import type { CartItemType } from '../../types/cartItem';

import { addToSaveForLater } from '../../slice/savedForLaterSlice';

type CartItemProps = {
  product: CartItemType;
};

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <li className={styles['cart-item']}>
      <div
        className={styles['item-image-container']}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={`/src${product.image}`}
          alt={product.name}
          className={styles['item-image']}
        />
      </div>
      <div className={styles['item-details']}>
        <div>
          <p className={styles['item-name']}>{product.name}</p>
          {/* <p className={styles['item-id']}>{`#ID${product.id}`}</p> */}
          <p className={styles['item-size']}>
            Size: {product.size.toUpperCase()}
          </p>
        </div>
        <div className={styles['item-action']}>
          <button
            className={styles['action-btn']}
            onClick={() => {
              dispatch(addToSaveForLater(product));
              dispatch(removeFromCart({ id: product.id, size: product.size }));
            }}
          >
            Save for Later
          </button>
        </div>
      </div>
      {/* buttons */}
      <div className={styles['btn-container']}>
        <button
          className={styles['increase-btn']}
          onClick={() =>
            dispatch(
              decreaseQuantity({
                id: product.id,
                size: product.size,
              })
            )
          }
        >
          {product.quantity === 1 ? (
            <RiDeleteBin2Line className={styles['delete-icon']} />
          ) : (
            '-'
          )}
        </button>
        <span>{product.quantity}</span>
        <button
          className={styles['decrease-btn']}
          onClick={() =>
            dispatch(
              increaseQuantity({
                id: product.id,
                size: product.size,
              })
            )
          }
        >
          +
        </button>
      </div>

      <div className={styles['item-price']}>{`$ ${product.price} each`}</div>

      <div className={styles['item-price']}>{`$ ${(
        product.price * product.quantity
      ).toFixed(2)}`}</div>
      <button
        className={styles['remove-btn']}
        onClick={() =>
          dispatch(removeFromCart({ id: product.id, size: product.size }))
        }
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;
