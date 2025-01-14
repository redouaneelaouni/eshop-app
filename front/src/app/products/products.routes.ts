import {Routes} from "@angular/router";
import {ProductListComponent} from "./features/product-list/product-list.component";
import {CartSummaryComponent} from "../shopping-cart/cart-summary/cart-summary.component";
import {authGuard} from "../services/auth/auth.guard";

export const PRODUCTS_ROUTES: Routes = [
	{
		path: "list",
		component: ProductListComponent,
    canActivate: [authGuard]
	},
  {
    path: "cart-summary",
    component: CartSummaryComponent,
    canActivate: [authGuard]
  },
	{ path: "**", redirectTo: "list" },
];


