import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProductById } from '../../slice/productSlice';
import type { RootState } from '../../app/store';
import styles from './ProductDetailPage.module.css';
import type { CartItem, Sizekey } from '../../types/cartItem';
import SizeSelector from '../../components/SizeSelector/SizeSelector';
import QuantityButton from '../../components/QuantityButton/QuantityButton';
import AddToCart from '../../components/AddToCart/AddToCart';
import { PiKeyReturn } from 'react-icons/pi';
import { HiOutlineTruck } from 'react-icons/hi2';
import { IoStorefrontOutline } from 'react-icons/io5';

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

  const handleModalClose = () => {
    setSelectedSize(null);
    setSelectedQty(1);
  };

  return (
    <>
      <section className={styles['breadcrumb-container']}>
        <div className={styles['breadcrumb']}>
          <Link to="/">Home</Link>{selectedProduct && <Link to="/products">/Products</Link>}/
          {selectedProduct.name}
        </div>
      </section>

      <div className={styles['container']}>
        <section className={styles['img-container']}>
          <img
            src={`/src/${selectedProduct?.image}`}
            alt={selectedProduct?.name}
            className={styles['image']}
          />
        </section>
        <div className={styles['detail-container']}>
          <section className={styles['info-container']}>
            <h1>{selectedProduct.name}</h1>
            <p>$ {selectedProduct.price}</p>
            <p>
              #{`${selectedProduct.category[0]}123-${selectedProduct.id}LJ`}
            </p>
            <p>
              <span>Fit:</span> Sizes 16-24
            </p>
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
              // onAddSuccess={() => {}}
              onModalClose={handleModalClose}
            />

            <div>
              <div>
                <h4>Description</h4>
                <p>{selectedProduct.description}</p>
              </div>
              <div>
                <p>Material:</p>
                <p> {selectedProduct.fabric}</p>
              </div>
              <div>
                <p>Care & Use</p>
                <p>
                  Hand wash in cold water with mild detergent. Use only
                  non-chlorine bleach when needed. Lay flat to dry and reshape
                  while still wet. Do not wring. Iron at low setting on reverse.
                  Exclusive of trim.
                </p>
              </div>
            </div>
          </section>
          <section>
            <div>
              <div>
                <PiKeyReturn />
                <span>Easy Return</span>
              </div>
              <div>
                <HiOutlineTruck />
                <span>Fast Delivery</span>
              </div>
              <div>
                <IoStorefrontOutline />
                <span>In store pickup</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
