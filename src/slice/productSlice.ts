import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { clearCart } from './cartSlice';

import type { AppDispatch, RootState } from '../app/store';
import { setMaxPrice } from './filterSlice';

export type Size = {
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  sizes: Size;
  bestseller: boolean;
  new: boolean;
  onSale: boolean;
  fabric: string;
  image: string;
  description: string;
};

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ProductState {
  products: Product[];
  status: Status;
  error: null | string;
  selectedProduct: null | Product;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('fetch/products', async (_, { rejectWithValue, dispatch }) => {
  try {
    const res = await fetch('http://localhost:3000/products');
    if (!res.ok) {
      return rejectWithValue('Failed to fetch products');
    }

    const data: Product[] = await res.json();
    // find max price

    let maxPrice: number;
    if (data.length === 0) {
      maxPrice = 0;
    } else {
      maxPrice = Math.max(...data.map((p) => p.price));
    }
    dispatch(setMaxPrice(maxPrice));

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Something went wrong...!');
  }
});

export const updateProducts = createAsyncThunk<
  string,
  void,
  { state: RootState; dispatch: AppDispatch; rejectWithValue: string }
>('update/products', async (_, { getState, dispatch, rejectWithValue }) => {
  const state = getState();
  const orderedItems = state.cart.items;

  try {
    if (orderedItems.length > 0) {
      for (const item of orderedItems) {
        const res = await fetch(`http://localhost:3000/products/${item.id}`);
        if (!res.ok) {
          return rejectWithValue(`Failed to fetch product ${item.id}`);
        }
        const product = await res.json();

        if (product.sizes[item.size] >= item.quantity) {
          const updatedSize = {
            ...product.sizes,
            [item.size]: product.sizes[item.size] - item.quantity,
          };

          await fetch(`http://localhost:3000/products/${item.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sizes: updatedSize }),
          });
        } else {
          return rejectWithValue(
            `Not enough stock available for item ${item.name} in size ${item.size}.`
          );
        }
      }
      dispatch(clearCart());
      return 'Stock updated and cart cleared';
    } else {
      return rejectWithValue('No items to update');
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue('Failed to update stock after checkout');
  }
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(updateProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(updateProducts.fulfilled, (state) => {
        state.status = 'succeeded';
      });
  },
});
export const { setSelectedProduct, clearSelectedProduct } =
  productSlice.actions;
export default productSlice.reducer;
