import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CART_DATA_STORE_NAME, CartState } from "./cart.state";

export const selectCartData = createFeatureSelector<CartState>(CART_DATA_STORE_NAME);

export const selectCartModel = createSelector(selectCartData, (state) => state?.model);
