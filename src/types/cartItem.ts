export type Size = {
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
};

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: Size;
  quantity: number;
}
