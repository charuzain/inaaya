import { createSlice } from '@reduxjs/toolkit';
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
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
