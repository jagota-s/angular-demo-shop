import { model } from '@angular/core';
import { Cart } from '../../models/cart';


export interface CartState {
  model: Cart[] | null;
  isLoading: boolean;
  isError: boolean;
}

export const CART_DATA_STORE_NAME = 'cartDataStore';

export interface CartDataStore {
  [CART_DATA_STORE_NAME]: CartState;
}