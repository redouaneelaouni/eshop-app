import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import * as fromRoot from '../index'
import {MessageService} from "primeng/api";
import * as CartActions from "./cart.action";
import {LoadCartSuccessAction} from "./cart.action";
import {CartService} from "../../services/cart/cart.service";
import {ActionTypes, SetUser} from "../authentication/auth.actions";
import {getUserSelector} from "../index";

@Injectable()
export class CartEffects {

  loadCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.ActionType.LOAD_CART),
    tap(action => console.log('Cart Update action dispatched:', action)),
    switchMap(() =>
      this.cartService.loadCart().pipe(
        map(response => {
          return new LoadCartSuccessAction(response)
        }),
        catchError(error => {
          console.log(error)
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error || 'Cart Update Failed'
          });

          return of();
        })
      )
    )
  ));

  updateCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.ActionType.UPDATE_CART),
    tap(action => console.log('Cart Update action dispatched:', action)),
    switchMap((value: any) =>
      this.cartService.updateCart(value.payload).pipe(
        map(response => {
          return new LoadCartSuccessAction(response)
        }),
        catchError(error => {
          console.log(error)
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error || 'Cart Update Failed'
          });

          return of();
        })
      )
    )
  ))

/*
loadCartSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CartActions.ActionType.LOAD_CART_SUCCESS),
        tap(action => console.log('Load Cart Success action dispatched:', action)),
        withLatestFrom(this.store.select(getUserSelector)),
        tap(([action, user]) => {
          this.cartService.storeUserInfos(user);
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: `Welcome back, ${user.username}!`
          });
          this.router.navigate(['/products/list']);
        })
      ),
    { dispatch: false }
  );

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.LOAD_USER),
    tap(action => console.log('Login User action dispatched:', action)),
    switchMap(action => {
      let userFromStorage = this.cartService.getUserFromStorage();
      if (userFromStorage!== null && userFromStorage !== undefined) {
        this.router.navigate(['/home']);
        return of(new SetUser(userFromStorage))
      }
      return of()
    })
  ))
*/


  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private messageService: MessageService
  ) {
  }
}
