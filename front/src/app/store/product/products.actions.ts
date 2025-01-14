import {type} from "../utils";
import {Action} from "@ngrx/store";
import {Product} from "../../products/data-access/product.model";
import {PageResponse} from "../../services/products/products.service";

export const ActionType = {
  LOAD_PRODUCT: type('[Products] Load Products'),
  LOAD_PRODUCT_SUCCESS: type('[Products] Load Products Success'),
  LOAD_PRODUCT_FAILURE: type('[Products] Load Products Failure'),
}
export class LoadProduct implements Action {
  readonly type: string = ActionType.LOAD_PRODUCT;

  constructor(public payload?: { page: number; size: number }) {}
}

export class LoadProductsSuccess implements Action {
  readonly type: string = ActionType.LOAD_PRODUCT_SUCCESS;

  constructor(public payload: PageResponse<Product>) {
  }
}

export class LoadProductsFailure implements Action {
  readonly type: string = ActionType.LOAD_PRODUCT_FAILURE;

  constructor(public payload: any) {
  }
}
