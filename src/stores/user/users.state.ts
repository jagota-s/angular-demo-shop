import { User } from "../../models/user";

export interface UserDataState {
  model: User | null;
  isLoading: boolean;
  isError: boolean;
}

export const USER_DATA_STORE_NAME = 'userDataStore';

export interface userDataStore {
  [USER_DATA_STORE_NAME]: UserDataState;
}