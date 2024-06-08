import { Product } from "./product";

export interface Cart {
  product: Product[];
  id?: string;
  userId: string;
}

export interface PriceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}