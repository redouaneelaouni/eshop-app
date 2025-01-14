import {Component, input, model, output, signal} from '@angular/core';
import {Product} from "../../data-access/product.model";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgIf, NgStyle, NgSwitch, NgSwitchCase} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../store/index'
import {UpdateCartAction} from "../../../store/cart/cart.action";
import {IMG_LINK} from "../../../shared/constants";
import {AuthService} from "../../../services/auth/auth.service";
import {Observable} from "rxjs";
import {isAdminSelector} from "../../../store/index";
import {CartItem, CartItemRequest} from "../../../model/cart.model";
import {CartState} from "../../../store/cart/cart.reducer";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    Button,
    CardModule,
    RatingModule,
    FormsModule,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    Ripple,
    NgStyle,
    InputNumberModule,
    AsyncPipe
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  isAdmin$: Observable<boolean>;
  product = input.required<Product>()
  quantity = signal(0);
  quantityInputVisible = signal(false);

  deleteProduct = output<Product>()
  updateProduct = output<Product>()


  constructor(private store: Store<CartState>, private authService: AuthService) {
     this.isAdmin$ = this.store.select(isAdminSelector);
  }

  emitUpdateEvent(product: Product) {
    this.updateProduct.emit(product)
  }


  emitDeleteEvent(product: Product) {
    this.deleteProduct.emit(product)
  }

  hidePrice(): boolean {
    return this.product()?.inventoryStatus === "OUTOFSTOCK"
  }

  showInventoryStatus(): boolean {
    return ["LOWSTOCK", "OUTOFSTOCK"].includes(this.product()?.inventoryStatus);
  }

  onAddToCart() {
    this.quantityInputVisible.set(true)
  }

  handleCartQuantityChange(newValue: number) {
    this.quantity.set(newValue);
    const updatedProduct: CartItemRequest= {
      productId: this.product().id,
      quantity: newValue,
    };
    this.store.dispatch(new UpdateCartAction(updatedProduct));
  }

  protected readonly IMG_LINK = IMG_LINK;
}
