import React from 'react';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';

const SavedForLater = () => {
  const { savedProducts } = useAppSelector(
    (state: RootState) => state.savedProduct
  );

  console.log('savedProducts:', savedProducts);

  console.log(savedProducts);
  return (
    <>
      <div>
        <h3>Saved For Later</h3>
        <span>{`${savedProducts.length} items `}</span>
      </div>
      {savedProducts.map((product) => (
        <article key={`${product.id}-${product.size}`}>
          <div>
            <img src={`/src/${product.image}`} alt={product.name} />
          </div>
          <div>
            <span>{product.name}</span>
            <span>{product.size}</span>
            <span>{product.price}</span>
          </div>
          <div>
            <button>Remove</button>
            <button>Move to bag</button>
          </div>
        </article>
      ))}
    </>
  );
};

export default SavedForLater;
