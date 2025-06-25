import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CartItemType } from '../types/cartItem';

export interface CartState {
  items: CartItemType[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      // find if item added alreay exist in the array and also check the size , if it exists increase the quantity
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; size: string }>
    ) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ id: number; size: string }>
    ) => {
      const product = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (product && product.stock > product.quantity) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ id: number; size: string }>
    ) => {
      const product = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (product && product.quantity === 1) {
        state.items = state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.size === action.payload.size
            )
        );
        return;
      }

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
