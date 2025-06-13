import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Order = 'asc' | 'desc';

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
    setCategory: () => {},
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;
