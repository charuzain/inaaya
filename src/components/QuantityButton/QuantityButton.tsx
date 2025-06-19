import React from 'react';
import styles from './QuantityButton.module.css';

interface QuantityButtonProps {
  selectedQty: number;
  increaseQtyHandler: () => void;
  decreaseQtyHandler: () => void;
  disableIncrease: boolean;
  disableDecrease: boolean;
}

const QuantityButton = ({
  selectedQty,
  increaseQtyHandler,
  decreaseQtyHandler,
  disableIncrease,
  disableDecrease,
}: QuantityButtonProps) => {
  return (
    <div className={styles['action-buttons']}>
      <button
        className={styles['decrease-button']}
        onClick={decreaseQtyHandler}
        disabled={disableDecrease}
      >
        -
      </button>

      <span className={styles['quantity']}>{selectedQty}</span>
      <button
        className={styles['add-button']}
        onClick={increaseQtyHandler}
        disabled={disableIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
