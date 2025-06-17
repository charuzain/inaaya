import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Order = 'asc' | 'desc';

type Sort = {
  sortBy: string;
  order: Order;
};

interface FilterState {
  category: string;
  searchTerm: string;
  sort: Sort;
  maxPrice: number;
  selectedPrice: number;
}

const initialState: FilterState = {
  category: 'all',
  searchTerm: '',
  sort: { sortBy: 'name', order: 'asc' },
  maxPrice: 0,
  selectedPrice: 0,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortTerm: (state, action: PayloadAction<Sort>) => {
      console.log(action.payload);
      const { sortBy, order } = action.payload;
      state.sort.sortBy = sortBy;
      state.sort.order = order;
    },

    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
      state.selectedPrice = action.payload;
    },
    setSelectedPrice: (state, action: PayloadAction<number>) => {
      state.selectedPrice = action.payload;
    },
  },
});

export const {
  setCategory,
  setSearchTerm,
  setSortTerm,
  setMaxPrice,
  setSelectedPrice,
} = filterSlice.actions;

export default filterSlice.reducer;
