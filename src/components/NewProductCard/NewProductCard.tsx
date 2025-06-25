import React from 'react';
import type { Product } from '../../slice/productSlice';
import styles from './NewProductCard.module.css';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useNavigate } from 'react-router';

const NewProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles['product-card']}
      onClick={() => {
        navigate(`/products/${product.id}`);
      }}
    >
      <div className={styles['product-card-image-wrapper']}>
        <img
          src={`/src/${product.image}`}
          alt={product.name}
          className={styles['product-card-image']}
        />

        <GoHeart
          className={styles['favorite-button']}
          fill={product.favorite ? 'currentColor' : 'none'}
          size={20}
          strokeWidth={1.5}
        />
      </div>
      <div className={styles['product-info']}>
        <h3 className={styles['product-name']}>{product.name}</h3>
        <p className={styles['product-price']}>{product.price}</p>
      </div>
    </div>
  );
};

export default NewProductCard;
