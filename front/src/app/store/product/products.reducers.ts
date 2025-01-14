import { Action } from '@ngrx/store';
import { Product } from '../../products/data-access/product.model';
import * as ProductActions from './products.actions';
import {AuthState} from "../authentication/auth.reducer";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
  totalElements: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  totalElements: 0
};

export function reducer(
  state = initialState,
  action: ProductActions.LoadProduct | ProductActions.LoadProductsSuccess | ProductActions.LoadProductsFailure
): ProductState {
  switch (action.type) {
    case ProductActions.ActionType.LOAD_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ProductActions.ActionType.LOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,

        products: (action as ProductActions.LoadProductsSuccess).payload.content,
        totalElements: action.payload.totalElements,
        error: null
      };

    case ProductActions.ActionType.LOAD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: (action as ProductActions.LoadProductsFailure).payload
      };

    default:
      return state;
  }
}

export const getProducts: any = (state: ProductState) => state.products
export const getTotalElements: any = (state: ProductState) => state.totalElements;
