import { Seller } from "../../models/seller";

export interface SellerDataState {
  model: Seller | null;
  isLoading: boolean;
  isError: boolean;
}

export const SELLER_DATA_STORE_NAME = 'sellerDataStore';

export interface SellerDataStore {
  [SELLER_DATA_STORE_NAME]: SellerDataState;
}