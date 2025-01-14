import {enableProdMode, importProvidersFrom} from "@angular/core";

import {registerLocaleData} from "@angular/common";
import {provideHttpClient, withInterceptors, withInterceptorsFromDi,} from "@angular/common/http";
import localeFr from "@angular/common/locales/fr";
import {bootstrapApplication, BrowserModule} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {APP_ROUTES} from "app/app.routes";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {AppComponent} from "./app/app.component";
import {environment} from "./environments/environment";
import {provideStore} from '@ngrx/store';
import {reducers} from "./app/store";
import {provideEffects} from '@ngrx/effects';
import {ProductEffects} from "./app/store/product/products.effects";
import {authInterceptor} from "./app/services/auth/auth.interceptor";
import {AuthEffects} from "./app/store/authentication/auth.effects";
import {CartEffects} from "./app/store/cart/cart.effects";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    ConfirmationService,
    MessageService,
    DialogService,
    provideStore(reducers),
    provideEffects(ProductEffects, AuthEffects, CartEffects),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations()
],
}).catch((err) => console.log(err));

registerLocaleData(localeFr, "fr-FR");
