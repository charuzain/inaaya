import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../slice/cartSlice';
import {
  clearQuickViewProduct,
  clearSelectedProduct,
} from '../slice/productSlice';
import type { Sizekey } from '../types/cartItem';

export interface AddToCartHadlerProps {
  selectedSize: Sizekey | null;
  stock: number;
  selectedQty: number;
  availableStock: number;
  onAddSuccess?: () => void;
}

export const useAddToCart = () => {

  const dispatch = useAppDispatch();
  const { quickViewProduct, selectedProduct } = useAppSelector(
    (state) => state.product
  );

  const product = quickViewProduct || selectedProduct;

  const addToCartHandler = ({
    selectedSize,
    stock,
    selectedQty,
    availableStock,
    onAddSuccess,
  }: AddToCartHadlerProps) => {
    console.log('Add to cart clicked');
    if (!selectedSize || !stock || !product) {
      return;
    }

    if (selectedQty > availableStock) {
      return;
    }
    dispatch(
      addToCart({
        id: product?.id,
        name: product?.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity: selectedQty,
        stock: stock,
      })
    );
    if (quickViewProduct) {
      dispatch(clearQuickViewProduct());
    }
    console.log('onAddSuccess called');
    onAddSuccess?.();
    console.log('onAddSuccess called');
  };

  return { addToCartHandler };
};
