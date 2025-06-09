import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../slice/themeSlice';
import productReducer from '../slice/productSlice';
import cartReducer from '../slice/cartSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
