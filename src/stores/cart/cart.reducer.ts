import { ActionCreator, ReducerTypes, createReducer, on } from "@ngrx/store";
import { CartState } from "./cart.state";
import { addToCart, addToCartFromApi, updateCart, updateCartFromApi } from "./cart.action";



export const cartInitialSate: CartState = {
  model: [],
  isLoading: false,
  isError: false
}


export const cartDataReducerFeatures: ReducerTypes<CartState, ActionCreator[]>[] = [
  on(addToCart, (state, payload) => ({ ...state, model: [payload.model], isLoading: false, isError: false })),
  on(addToCartFromApi, (state) => ({ ...state, isLoading: true, isError: false })),
  on(updateCart, (state, payload) => ({ ...state, model: [payload.model], isLoading: false, isError: false })),
  on(updateCartFromApi, (state) => ({ ...state, isLoading: true, isError: false }))
]


export const cartDataReducer = createReducer(
  cartInitialSate,
  ...cartDataReducerFeatures
);