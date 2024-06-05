import { ActionCreator, ReducerTypes, createReducer, on } from "@ngrx/store";

import { addProductData, addProductDataFromApi, setProductData, setProductDataFromApi } from "./product.actions";
import { ProductDataState } from "./product.state";
import { model } from "@angular/core";



export const productDataIntialState: ProductDataState = {
  model: null,
  isLoading: false,
  isError: false
}

export const productDataReducerFeatures: ReducerTypes<ProductDataState, ActionCreator[]>[] = [
  on(setProductData, (state, payload) => ({ ...state, model: payload.model, isLoading: false, isError: false })),
  on(setProductDataFromApi, (state) => ({ ...state, isLoading: true, isError: false })),
  on(addProductData, (state, payload) => ({ ...state, model: state.model?.length ? [...state.model, payload.model] : [payload.model], isLoading: false, isError: false })),
  on(addProductDataFromApi, (state) => ({ ...state, isLoading: false, isError: false })),

];

export const productDatareducer = createReducer(
  productDataIntialState,
  ...productDataReducerFeatures
);