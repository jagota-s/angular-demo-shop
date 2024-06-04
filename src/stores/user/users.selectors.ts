import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_DATA_STORE_NAME, UserDataState } from "./users.state";

export const selectUserData = createFeatureSelector<UserDataState>(USER_DATA_STORE_NAME);

export const selectUserModel = createSelector(selectUserData, (state) => state?.model);
