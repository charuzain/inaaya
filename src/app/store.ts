import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../slice/themeSlice';
import productReducer from '../slice/productSlice';
import cartReducer from '../slice/cartSlice';
import filterReducer from '../slice/filterSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    product: productReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
