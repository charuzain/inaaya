import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../slice/themeSlice';
import productReducer from '../slice/productSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
