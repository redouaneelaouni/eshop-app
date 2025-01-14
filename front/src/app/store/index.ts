import {createSelector} from "@ngrx/store"
import * as fromCartState from './cart/cart.reducer'
import * as fromAuth from './authentication/auth.reducer'
import {getUser} from './authentication/auth.reducer'
import * as fromProducts from './product/products.reducers'

export interface State {

  cart: fromCartState.CartState,
  auth: fromAuth.AuthState,
  products: fromProducts.ProductState
}

//Global Reducer
export const reducers: any = {
  cart: fromCartState.reducer,
  auth: fromAuth.reducer,
  products: fromProducts.reducer,
}

//selectors
export const getProductsState: any = (state: State) => state.products
export const getProductCartState: any = (state: State) => state.cart;
export const getAuthState: any = (state: State) => state.auth;

export const getProductsSelector:any = createSelector(getProductsState, fromProducts.getProducts);
export const getTotalElementsSelector:any = createSelector(getProductsState, fromProducts.getTotalElements);

export const cartItemSelector: any = createSelector(getProductCartState, fromCartState.getCartItems)
export const cartItemCountSelector: any = createSelector(getProductCartState, fromCartState.getTotalQuantityCart)
export const totalPriceSelector: any = createSelector(getProductCartState, fromCartState.getTotalPriceCart)

export const getUserSelector: any = createSelector(getAuthState, getUser)
export const isAuthenticatedSelector: any = createSelector(getAuthState, fromAuth.isAuthenticated)
export const isAdminSelector: any = createSelector(getAuthState, fromAuth.isAdmin)
export const getUsernameSelector: any = createSelector(getAuthState, fromAuth.getUsername)
export const getLoadingSelector: any = createSelector(getAuthState, fromAuth.getLoading)
export const getTokenSelector: any = createSelector(getAuthState, fromAuth.getToken)



