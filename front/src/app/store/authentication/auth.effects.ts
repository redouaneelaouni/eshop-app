// auth.effects.ts
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import * as AuthActions from './auth.actions';
import {ActionTypes, LoginFailure, LoginSuccess, SetUser} from './auth.actions';
import {AuthService} from "../../services/auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromRoot from '../index'
import {getUserSelector} from '../index'
import {MessageService} from "primeng/api";
import {StorageHelper} from "../../services/helper/localStorage.helper";
import {User} from "../../model/auth.model";

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LOGIN),
    tap(action => console.log('Login action dispatched:', action)),
    switchMap((value:any) =>
      this.authService.login(value.payload).pipe(
        map(response => {
          return new LoginSuccess(response);
        }),
        catchError(error => {
          console.log(error)
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error || 'Login failed'
          });

          return of(new LoginFailure({error}));
        })
      )
    )
  ));

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.ActionTypes.LOGIN_SUCCESS),
        tap(action => console.log('Login Success action dispatched:', action)),
        withLatestFrom(this.store.select(getUserSelector)),
        tap(([action, user]) => {
          StorageHelper.store('user', user);
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
      let userFromStorage = StorageHelper.get<User>('user');
      if (userFromStorage!== null && userFromStorage !== undefined) {
        this.router.navigate(['/home']);
        return of(new SetUser(userFromStorage))
      }
      return of()
    })
  ))

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.ActionTypes.LOGOUT),
        tap(action => console.log('Logout action dispatched:', action)),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  private store: Store<fromRoot.State>,
    private messageService: MessageService
  ) {}
}
