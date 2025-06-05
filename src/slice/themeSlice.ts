import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: '',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: () => {},
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
