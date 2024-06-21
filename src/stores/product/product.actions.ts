import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product";
import { ApiActionPayload } from "../../models/apiAction";


const ACTION_SET = '[Product Data] Set Product Data';
const ACTION_SET_API = '[Product Data] Set Product Data from API';
const ACTION_ADD_PRODUCT = '[Product Data] Add Product';
const ACTION_ADD_PRODUCT_API = '[Product Data] Add Product from API';
const ACTION_UPDATE_PRODUCT = '[Product Data] Update Product';
const ACTION_UPDATE_PRODUCT_API = '[Product Data] Update Product from API';
const ACTION_DELETE_PRODUCT = '[Product Data] Delete Product';
const ACTION_DELETE_PRODUCT_API = '[Product Data] Delete Product from API';


export const setProductData = createAction(ACTION_SET, props<{ model: Product[] }>());

export const setProductDataFromApi = createAction(ACTION_SET_API, props<ApiActionPayload<Product[]>>());

export const addProductData = createAction(ACTION_ADD_PRODUCT, props<{ model: Product }>());

export const addProductDataFromApi = createAction(ACTION_ADD_PRODUCT_API, props<ApiActionPayload<Product>>());

export const updateProuctData = createAction(ACTION_UPDATE_PRODUCT, props<{ model: Product }>());

export const updateProductDataFromApi = createAction(ACTION_UPDATE_PRODUCT_API, props<ApiActionPayload<Product>>());

export const deleteProduct = createAction(ACTION_DELETE_PRODUCT, props<{ id: string }>());

export const deleteProductFromApi = createAction(ACTION_DELETE_PRODUCT_API, props<{ id: string }>());



