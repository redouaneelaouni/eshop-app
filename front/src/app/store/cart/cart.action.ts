import {type} from "../utils";
import {Action} from "@ngrx/store";
import {Cart, CartItem, CartItemRequest} from "../../model/cart.model";
import {CartState} from "./cart.reducer";

export const ActionType = {
  LOAD_CART: type('[Cart] load cart'),
  UPDATE_CART: type('[Cart] update cart'),
  DELETE_ITEM_CART: type('[Cart] delete item cart'),
  LOAD_CART_SUCCESS: type('[Cart] Load Cart Success'),
  CLEAR_CART: type('[Cart] Clear Cart'),
}
export class LoadCartAction implements Action {
  readonly type: string = ActionType.LOAD_CART;

  constructor() {
  }
}


export class UpdateCartAction implements Action {
  readonly type: string = ActionType.UPDATE_CART;

  constructor(public payload: CartItemRequest) {
  }
}

export class DeleteItemCartAction implements Action {
  readonly type: string = ActionType.DELETE_ITEM_CART;

  constructor(public payload: CartItemRequest) {
  }
}

export class LoadCartSuccessAction implements Action {
  readonly type: string = ActionType.LOAD_CART_SUCCESS;

  constructor(public payload: Cart) {}
}

export class ClearCartAction implements Action {
  readonly type: string = ActionType.CLEAR_CART;
}

export type Actions = UpdateCartAction | LoadCartSuccessAction | DeleteItemCartAction;
