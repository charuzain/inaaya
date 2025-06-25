import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  savedProducts: [],
};
export const savedForLaterSlice = createSlice({
  name: 'savedProduct',
  initialState,
  reducers: {
    addToSaveForLater: (state, action) => {},
    removeFromSaveToLater: (state, action) => {},
    moveToBag: (state, action) => {},
  },
});

export const { addToSaveForLater, removeFromSaveToLater, moveToBag } =
  savedForLaterSlice.actions;

export default savedForLaterSlice.reducer;
