import { ActionCreator, ReducerTypes, createReducer, on } from "@ngrx/store";

import { addProductData, addProductDataFromApi, deleteProduct, deleteProductFromApi, setProductData, setProductDataFromApi, updateProductDataFromApi, updateProuctData } from './product.actions';
import { ProductDataState } from "./product.state";




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
  on(updateProuctData, (state, payload) => ({
    ...state,
    model: state.model ? [...state.model.filter(product => product.id !== payload.model.id), payload.model] : [payload.model],
    isLoading: false,
    isError: false
  })),
  on(updateProductDataFromApi, (state) => ({ ...state, isLoading: true, isError: false })),
  on(deleteProduct, (state, payload) => ({
    ...state,
    model: state.model ? state.model.filter(product => product.id !== payload.id) : null,
    isLoading: false,
    isError: false,
  })),
  on(deleteProductFromApi, (state) => ({ ...state, isLoading: true, isError: false })),

];

export const productDatareducer = createReducer(
  productDataIntialState,
  ...productDataReducerFeatures
);