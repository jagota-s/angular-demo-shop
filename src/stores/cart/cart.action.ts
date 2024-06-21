import { createAction, props } from "@ngrx/store";
import { Cart } from "../../models/cart";
import { ApiActionPayload } from "../../models/apiAction";


export const ADD_TO_CART = '[Cart Data] Add to Cart';
export const ADD_TO_CART_API = '[Cart Data] Add to Cart from API';
export const REMOVE_FROM_CART = '[Cart Data] Remove from Cart';
export const REMOVE_FROM_CART_API = '[Cart Data] Remove from Cart from API';
export const UPDATE_CART = '[Cart Data] Update Cart';
export const UPDATE_CART_API = '[Cart Data] Update Cart from API';



export const addToCart = createAction(ADD_TO_CART, props<{ model: Cart }>());
export const addToCartFromApi = createAction(ADD_TO_CART_API, props<ApiActionPayload<Cart>>());
export const updateCart = createAction(UPDATE_CART, props<{ model: Cart }>());
export const updateCartFromApi = createAction(UPDATE_CART_API, props<ApiActionPayload<Cart>>());