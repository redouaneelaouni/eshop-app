import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as ProductActions from './products.actions';
import {ProductsService} from "../../services/products/products.service";
import {LoadProduct} from "./products.actions";

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.ActionType.LOAD_PRODUCT),
      mergeMap((action: LoadProduct) => {
        const page = action.payload?.page ?? 1;
        const size = action.payload?.size ?? 10;
          return this.productService.get(page, size).pipe(
            map(response => new ProductActions.LoadProductsSuccess(response)),
            catchError(error => of(new ProductActions.LoadProductsFailure({error})))
          );
        }
      )
    );
  });


}
