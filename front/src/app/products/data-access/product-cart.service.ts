/*
import {Injectable} from '@angular/core';
import {CartState} from "../../store/cart/cart.reducer";
import {CartItem} from "../../model/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
  }

  static updateCart(state: CartState, itemToAdd: CartItem): CartState {
    let updatedIemList;

    if (itemToAdd.quantity === 0) {
      updatedIemList = this.removeItemFromCart(state, itemToAdd);
    } else {
      let updatedProductToAdd = {
        ...itemToAdd,
        totalItemPrice: itemToAdd.product.price * itemToAdd.quantity
      };
      updatedIemList = [
        ...this.removeItemFromCart(state, itemToAdd),
        updatedProductToAdd
      ];

    }

    const totalQuantityCart = this.getProductsCounts(updatedIemList, 'quantity');
    const totalPriceCart = this.getProductsCounts(updatedIemList, 'totalItemPrice');

    return {
      ...state,
      items: updatedIemList,
      totalPriceCart: totalPriceCart,
      totalQuantity: totalQuantityCart
    };
  }

  private static removeItemFromCart(state: CartState, productToAdd: CartItem): CartItem[] {
    return state.items.filter(cartItem => cartItem.product.id !== productToAdd.product.id);
  }

  private static getProductsCounts(updatedItemList: CartItem[], property: keyof CartItem): number {
    return updatedItemList.reduce((total, itemCart) => total + (itemCart[property] as number), 0);
  }
}
*/
