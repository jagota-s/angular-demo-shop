import { Product } from "../../models/product";

export interface ProductDataState {
  model: Product[] | null;
  isLoading: boolean;
  isError: boolean;
}

export const PRODUCT_DATA_STORE_NAME = "productDataStore";

export interface ProductDataStore {
  [PRODUCT_DATA_STORE_NAME]: ProductDataState;
}
