import type { RootState } from '../app/store';

export const numItem = (state: RootState): number =>
  state.cart.items.reduce((a, c) => a + c.quantity, 0);


