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
}

const initialState: FilterState = {
  category: 'all',
  searchTerm: '',
  sort: { sortBy: 'name', order: 'asc' },
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
  },
});

export const { setCategory, setSearchTerm, setSortTerm } = filterSlice.actions;

export default filterSlice.reducer;
