import {Actions, ActionType, LoadCartSuccessAction} from "./cart.action";
import {Cart} from "../../model/cart.model";
import {Action} from "@ngrx/store";


export interface CartState {
  cart: Cart
  loading: boolean;
  error: any;
}

const initialState: CartState = {
  cart: {
    id: 0,
    items: [],
    totalPrice: 0,
    quantity: 0
  },
  loading: false,
  error: {}
}

export function reducer(state: CartState = initialState, action: Actions): CartState {

  switch (action.type) {
    case ActionType.LOAD_CART_SUCCESS:
      return {
        ...state,
        cart: (action as LoadCartSuccessAction).payload,
        loading: false,
        error: null
      }
    case ActionType.CLEAR_CART:
      return initialState
    default:
      return state;
  }
}

export const getCartItems: any = (state: CartState) => state.cart.items;
export const getTotalQuantityCart: any = (state: CartState) => state.cart.quantity;
export const getTotalPriceCart: any = (state: CartState) => state.cart.totalPrice;

