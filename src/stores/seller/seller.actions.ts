import { createAction, props } from "@ngrx/store";
import { ApiActionPayload } from '../../models/apiAction';
import { Seller } from "../../models/seller";


const ACTION_SET = '[Seller Data] Set Seller Data';
const ACTION_SET_API = '[Seller Data] Set Seller Data from API';

export const setSellerData = createAction(ACTION_SET, props<{ model: Seller }>());

export const setSellerDataFromApi = createAction(ACTION_SET_API, props<ApiActionPayload<Seller>>());