import {AbstractService} from "../abstract.service";
import {Cart, CartItemRequest} from "../../model/cart.model";
import {API_ENDPOINTS} from "../../constants/api.constants";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CartService extends AbstractService<Cart> {

  loadCart(): Observable<Cart> {
    return this.get<Cart>(API_ENDPOINTS.cart);
  }

  updateCart(request: CartItemRequest): Observable<Cart> {
    return this.post<Cart, CartItemRequest>(API_ENDPOINTS.cart, request);
  }
}
