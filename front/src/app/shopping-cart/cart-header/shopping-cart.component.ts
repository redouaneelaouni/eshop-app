import {Component, signal, Signal} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store";
import {cartItemCountSelector} from "../../store";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  productCount= signal<Number>(0);


  constructor(private store: Store<fromRoot.State>) {
    store.select(cartItemCountSelector).subscribe(value => this.productCount.set(value))
  }
}
