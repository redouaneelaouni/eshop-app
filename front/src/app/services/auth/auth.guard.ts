// auth/guards/auth.guard.ts
import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {isAuthenticatedSelector, State} from "../../store";
import {ROUTES} from "../../constants/routes.constants";
import {map, take} from 'rxjs/operators';
import {LoadCartAction} from "../../store/cart/cart.action";

export const authGuard: CanActivateFn = () => {
  const store = inject(Store<State>);
  const router = inject(Router);

  return store.select(isAuthenticatedSelector).pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate([ROUTES.login]);
        return false;
      }
      store.dispatch(new LoadCartAction());
      return true;
    })
  );
};
