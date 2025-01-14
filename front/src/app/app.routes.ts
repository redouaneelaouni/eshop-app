import {Routes} from "@angular/router";
import {HomeComponent} from "./shared/features/home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {RegisterComponent} from "./register/register/register.component";
import {LoginComponent} from "./login/login.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
