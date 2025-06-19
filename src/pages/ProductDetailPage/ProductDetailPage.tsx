import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProductById } from '../../slice/productSlice';
import type { RootState } from '../../app/store';
import styles from './ProductDetailPage.module.css';
import type { CartItem, Sizekey } from '../../types/cartItem';
import SizeSelector from '../../components/SizeSelector/SizeSelector';
import QuantityButton from '../../components/QuantityButton/QuantityButton';
import AddToCart from '../../components/AddToCart/AddToCart';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState<Sizekey | null>(null);

  const [selectedQty, setSelectedQty] = useState<number>(1);

  const { selectedProduct, status } = useAppSelector(
    (state: RootState) => state.product
  );

  const stock = selectedSize ? selectedProduct?.sizes[selectedSize] ?? 0 : 0;

  const cartItems: CartItem | undefined = useAppSelector((state) =>
    state.cart.items.find(
      (item) => item.id === selectedProduct?.id && item.size === selectedSize
    )
  );

  let alreadyInCart: number;

  if (cartItems) {
    alreadyInCart = cartItems.quantity;
  } else {
    alreadyInCart = 0;
  }

  const availableStock = stock - alreadyInCart;


  const increaseQtyHandler = (): void => {
    setSelectedQty(selectedQty + 1);
  };

  const decreaseQtyHandler = (): void => {
    if (selectedQty > 1) {
      setSelectedQty(selectedQty - 1);
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }
  }, [productId, dispatch]);

  const handleSizeSelect = (size: Sizekey) => {
    setSelectedSize(size);
    setSelectedQty(1);
  };

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (!selectedProduct) {
    return <h1>No detail found..</h1>;
  }

  return (
    <>
      <div>
        <img
          src={`/src/${selectedProduct?.image}`}
          alt={selectedProduct?.name}
        />
      </div>
      <div>
        <SizeSelector
          sizes={selectedProduct.sizes}
          onSelect={handleSizeSelect}
        />
        {selectedSize && (
          <div>
            Selected Size : <span>{selectedSize.toUpperCase()}</span>
          </div>
        )}
      </div>
      <div>
        <span className={styles['stock-status']}></span>
        {selectedSize && stock !== 0 && (
          <p className={styles['stock-count']}>
            {stock} item(s) available in selected size .
            {alreadyInCart > 0 && availableStock > 0 && (
              <span>
                {`You already have ${alreadyInCart} item(s) in cart.`}
              </span>
            )}
          </p>
        )}
      </div>
      {selectedSize && stock === 0 && <span>Out of Stock</span>}
      {selectedSize && stock !== 0 && availableStock <= 0 && (
        <span>
          You already added all available stock of selected size to cart.
        </span>
      )}

      {selectedSize && stock > 0 && availableStock > 0 && (
        <QuantityButton
          increaseQtyHandler={increaseQtyHandler}
          decreaseQtyHandler={decreaseQtyHandler}
          selectedQty={selectedQty}
          disableIncrease={
            selectedQty === stock ||
            !selectedSize ||
            stock <= selectedQty + alreadyInCart
          }
          disableDecrease={!selectedSize || selectedQty === 1}
        />
      )}

      <AddToCart
        selectedSize={selectedSize}
        stock={stock}
        availableStock={availableStock}
        selectedQty={selectedQty}
        onAddSuccess={() => {
          console.log('Resetting selected size and qty');
          setSelectedSize(null);
          setSelectedQty(1);
        }}
      />
    </>
  );
};

export default ProductDetailPage;
