import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'dark' | 'light';

export interface ThemeState {
  theme: Theme;
}

const selectedTheme = localStorage.getItem('theme');

const isValidTheme = (value: string | null): value is Theme => {
  return value === 'light' || value === 'dark';
};

const validTheme: Theme = isValidTheme(selectedTheme) ? selectedTheme : 'light';

const initialState: ThemeState = {
  theme: validTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
