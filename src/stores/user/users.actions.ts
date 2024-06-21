import { createAction, props } from "@ngrx/store";
import { ApiActionPayload } from '../../models/apiAction';
import { User } from "../../models/user";


const ACTION_SET = '[User Data] Set User Data';
const ACTION_SET_API = '[User Data] Set User Data from API';
const ACTION_LOGIN_USER = '[User Data] Login User';
const ACTION_LOGIN_USER_API = '[User Data] Login User from API';

export const setUserData = createAction(ACTION_SET, props<{ model: User }>());

export const setUserDataFromApi = createAction(ACTION_SET_API, props<ApiActionPayload<User>>());



