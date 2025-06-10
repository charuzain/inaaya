import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CartItem } from '../types/cartItem';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
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
    removeFromCart: (state , action) => {

    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
