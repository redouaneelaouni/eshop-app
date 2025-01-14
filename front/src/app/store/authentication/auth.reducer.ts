import * as AuthActions from './auth.actions';
import {User} from "../../model/auth.model";

export interface AuthState {
  user: User | undefined;
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  user: undefined, loading: false, error: null, isAuthenticated: false,
};

export function reducer(state = initialState, action: AuthActions.Actions): AuthState {
  switch (action.type) {

    case AuthActions.ActionTypes.LOGIN_SUCCESS:
      return {
        ...state, user: action.payload, isAuthenticated: true, loading: false, error: null
      };

    case AuthActions.ActionTypes.LOGIN:
      return {
        ...state, loading: true
      };

    case AuthActions.ActionTypes.SET_USER:
      return {...state, user: action.payload, isAuthenticated: true};

    case AuthActions.ActionTypes.LOGIN_FAILURE:
      return {
        ...initialState, error: action.payload, loading: false
      };

    case AuthActions.ActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
}

export const isAuthenticated: any = (state: AuthState) => state.isAuthenticated
export const getUser: any = (state: AuthState) => state.user
export const isAdmin: any = (state: AuthState) => state.user?.role === 'ROLE_ADMIN'
export const getToken: any = (state: AuthState) => state.user?.token;
export const getUsername: any = (state: AuthState) => state.user?.username;
export const getLoading: any = (state: AuthState) => state.loading


