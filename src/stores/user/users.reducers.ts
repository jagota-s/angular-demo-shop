import { ActionCreator, ReducerTypes, createReducer, on } from "@ngrx/store";
import { UserDataState } from './users.state';
import { setUserData, setUserDataFromApi } from "./users.actions";

export const userDataIntialState: UserDataState = {
  model: null,
  isLoading: true,
  isError: false
}

export const userDataReducerFeatures: ReducerTypes<UserDataState, ActionCreator[]>[] = [
  on(setUserData, (state, payload) => ({ ...state, model: payload.model, isLoading: false, isError: false })),
  on(setUserDataFromApi, (state) => ({ ...state, isLoading: true, isError: false }))
];

export const userDatareducer = createReducer(
  userDataIntialState,
  ...userDataReducerFeatures
);