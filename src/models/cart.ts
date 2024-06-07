import { Product } from "./product";

export interface Cart {
  product: Product[];
  id?: string;
  userId: string;
}