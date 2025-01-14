import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {MessageService} from 'primeng/api';
import {CartState} from '../../store/cart/cart.reducer'
import {Store} from "@ngrx/store";
import {cartItemCountSelector, cartItemSelector, totalPriceSelector} from "../../store";
import {Observable} from "rxjs";
import {Product} from "../../products/data-access/product.model";
import {IMG_LINK} from "../../shared/constants";
import {LoadCartAction, UpdateCartAction} from "../../store/cart/cart.action";
import {CartItem} from "../../model/cart.model";


@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    CardModule,
    ToastModule,
    DialogModule
  ],
  providers: [MessageService],
  templateUrl: "cart-summary.component.html",
  styleUrl: "./cart-summary.component.css"
})
export class CartSummaryComponent implements OnInit {
  protected readonly IMG_LINK = IMG_LINK;


  products$: Observable<CartItem[]>;
  productsCount$: Observable<number>;
  totalPrice$: Observable<number>;
  showCheckoutDialog = false;

  constructor(private messageService: MessageService, private store: Store<CartState>) {
    this.products$ = this.store.select(cartItemSelector)
    this.totalPrice$ = this.store.select(totalPriceSelector)
    this.productsCount$ = this.store.select(cartItemCountSelector)
  }

  ngOnInit() {
    this.store.dispatch(new LoadCartAction());
  }

  handleCartQuantityChange(newValue: number, productId: number) {

    const updatedItemRequest = {
      productId: productId,
      quantity: newValue
    };
    /*this.messageService.add({
      severity: 'info',
      summary: 'Quantité mise à jour',
      detail: `${item.product.name}: ${item.quantity}`
    });*/
    this.store.dispatch(new UpdateCartAction(updatedItemRequest));

  }

  removeItem(item: Product): void {
    //todo
    this.messageService.add({
      severity: 'success',
      summary: 'Produit retiré',
      detail: `${item.name} a été retiré du panier`
    });
  }

  checkout(): void {
    this.showCheckoutDialog = true;
  }

  confirmCheckout(): void {
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Commande validée',
        detail: 'Merci pour votre commande !'
      });
      //todo
      this.showCheckoutDialog = false;
    }, 1000);
  }

  trackByProductId(index: number, item: CartItem): number {
    return item.product.id;  // Using product's string ID for tracking
  }
}
