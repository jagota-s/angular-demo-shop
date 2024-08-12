import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PRODUCT_DATA_STORE_NAME, ProductDataState } from "./product.state";

export const selectProductData = createFeatureSelector<ProductDataState>(PRODUCT_DATA_STORE_NAME);

export const selectProductModel = createSelector(selectProductData, (state) => state?.model);

export const selectProductIsPending = createSelector(selectProductData, (state) => state?.isLoading);
