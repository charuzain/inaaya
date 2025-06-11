export type Size = {
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
};

export type Sizekey = keyof Size;

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: Sizekey;
  quantity: number;
  stock: number;
}
