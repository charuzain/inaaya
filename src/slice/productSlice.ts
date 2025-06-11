import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

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
>('fetch/products', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('http://localhost:3000/products');
    if (!res.ok) {
      return rejectWithValue('Failed to fetch products');
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return rejectWithValue('Something went wrong...!');
  }
});

export const updateProducts = createAsyncThunk(
  'update/products',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const orderedItems = state.cart.items;
    console.log(state);
    console.log(orderedItems);

    try {
      if (orderedItems.length > 0) {
        for (let item of orderedItems) {
          const res = await fetch(`http://localhost:3000/products/${item.id}`);
          const product = await res.json();
          console.log(product);
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
        }
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to update stock after checkout');
    }
  }
);

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
