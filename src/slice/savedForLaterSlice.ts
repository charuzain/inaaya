import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItemType } from '../types/cartItem';
type StateForLaterState = {
  savedProducts: CartItemType[];
};
const initialState: StateForLaterState = {
  savedProducts: [],
};

export const savedForLaterSlice = createSlice({
  name: 'savedProduct',
  initialState,
  reducers: {
    addToSaveForLater: (state, action: PayloadAction<CartItemType>) => {
      const itemExist = state.savedProducts.find(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );
      if (!itemExist) {
        state.savedProducts.push(action.payload);
      }
    },
    removeFromSaveToLater: (state, action) => {},
    moveToBag: (state, action) => {},
  },
});

export const { addToSaveForLater, removeFromSaveToLater, moveToBag } =
  savedForLaterSlice.actions;

export default savedForLaterSlice.reducer;
