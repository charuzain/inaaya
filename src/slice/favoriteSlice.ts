import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './productSlice';

export interface favoriteProductState {
  favoriteProducts: Product[];
}

const initialState: favoriteProductState = {
  favoriteProducts: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const alreadyInWishlist = state.favoriteProducts.find(
        (product) => product.id === action.payload.id
      );
      if (!alreadyInWishlist) {
        state.favoriteProducts.push(action.payload);
      }
    },
    removeFromWishList: (state, action: PayloadAction<number>) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addToWishlist, removeFromWishList } = favoriteSlice.actions;
export default favoriteSlice.reducer;
