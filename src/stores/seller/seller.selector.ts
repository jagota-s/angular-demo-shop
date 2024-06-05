import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SELLER_DATA_STORE_NAME, SellerDataState } from "./seller.state";

export const selectSellerData = createFeatureSelector<SellerDataState>(SELLER_DATA_STORE_NAME);

export const selectSellerModel = createSelector(selectSellerData, (state) => state?.model);
