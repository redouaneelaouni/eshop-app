package ma.alten.altenshop.service;

import ma.alten.altenshop.entity.Cart;
import ma.alten.altenshop.exception.CartException;
import ma.alten.altenshop.model.CartDTO;
import ma.alten.altenshop.model.CartItemRequest;

import java.util.List;

public interface CartService {

	CartDTO createOrUpdateCart(CartItemRequest itemRequest) throws CartException;
	CartDTO deleteItemFromCart(CartItemRequest itemRequest) throws CartException;
	List<Cart> findActiveCartByUSerIdAndStatus();
}
