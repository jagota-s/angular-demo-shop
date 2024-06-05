import { ActionCreator, ReducerTypes, createReducer, on } from "@ngrx/store";
import { SellerDataState } from "./seller.state";
import { setSellerData, setSellerDataFromApi } from "./seller.actions";

export const sellerDataIntialState: SellerDataState = {
  model: null,
  isLoading: true,
  isError: false
}

export const sellerDataReducerFeatures: ReducerTypes<SellerDataState, ActionCreator[]>[] = [
  on(setSellerData, (state, payload) => ({ ...state, model: payload.model, isLoading: false, isError: false })),
  on(setSellerDataFromApi, (state) => ({ ...state, isLoading: true, isError: false }))

];

export const sellerDatareducer = createReducer(
  sellerDataIntialState,
  ...sellerDataReducerFeatures
);