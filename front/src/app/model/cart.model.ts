import {Product} from "../products/data-access/product.model";

export interface CartItem {
  id: number,
  product: Product;
  quantity: number;
  totalItemPrice: number;
}

export interface Cart {
  id: number,
  items: Array<CartItem>,
  totalPrice: number,
  quantity: number
}

export interface CartItemRequest {

  productId: number,
  quantity: number;
}
