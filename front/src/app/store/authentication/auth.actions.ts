import { Action } from '@ngrx/store';
import {LoginRequest, User} from "../../model/auth.model";
import {type} from "../utils";

export const ActionTypes = {
  LOGIN: type('[Auth] Login'),
  LOAD_USER: type('[Auth] Load User'),
  SET_USER: type('[Auth] SetUser'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGIN_FAILURE: type('[Auth] Login Failure'),
  LOGOUT: type('[Auth] Logout')
};

export class Login implements Action {

  readonly type = ActionTypes.LOGIN;

  constructor(public payload: LoginRequest) {}
}

export class LoadUser implements Action {
  readonly type = ActionTypes.LOAD_USER;
}

export class SetUser implements Action {
  readonly type = ActionTypes.SET_USER;
  constructor(public payload: User | undefined) {}
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginFailure implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export type Actions = Login | LoginSuccess | LoginFailure | Logout | LoadUser | SetUser ;
