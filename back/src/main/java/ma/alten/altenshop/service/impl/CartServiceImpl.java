package ma.alten.altenshop.service.impl;

import lombok.RequiredArgsConstructor;
import ma.alten.altenshop.entity.Cart;
import ma.alten.altenshop.entity.CartItem;
import ma.alten.altenshop.entity.Product;
import ma.alten.altenshop.entity.User;
import ma.alten.altenshop.enums.CartItemCriteria;
import ma.alten.altenshop.enums.CartStatus;
import ma.alten.altenshop.exception.CartException;
import ma.alten.altenshop.mapper.CartItemMapper;
import ma.alten.altenshop.mapper.CartMapper;
import ma.alten.altenshop.mapper.ProductMapper;
import ma.alten.altenshop.model.CartDTO;
import ma.alten.altenshop.model.CartItemRequest;
import ma.alten.altenshop.repository.CartRepository;
import ma.alten.altenshop.repository.ProductRepository;
import ma.alten.altenshop.service.CartService;
import ma.alten.altenshop.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	private final CartItemMapper cartItemMapper;
	private final UserService userService;
	private final CartMapper cartMapper;
	private final CartRepository cartRepository;
	private final ProductRepository productRepository;
	private final ProductMapper productMapper;

	@Override
	public CartDTO createOrUpdateCart(CartItemRequest itemRequest) throws CartException {

		if (itemRequest == null) {
			throw new CartException("itemRequest is null");
		}

		if (itemRequest.getProductId() == null) {
			throw new CartException("productId is null");
		}
		Product product = productRepository.findById(itemRequest.getProductId()).orElseThrow(() -> new CartException("product not found"));

		User currentUser = userService.getCurrentUser();
		List<Cart> cartList = findActiveCartByUSerIdAndStatus();
		var cartUpdated = new Cart();
		if (cartList.isEmpty()) {
			cartUpdated = createCart(itemRequest, userService.getCurrentUser(), product);
		} else {
			cartUpdated = updateCart(cartList.get(0), itemRequest, product);
		}

		return cartMapper.toDTO(cartUpdated);
	}

	@Override
	public CartDTO deleteItemFromCart(CartItemRequest itemRequest) throws CartException {

		if (itemRequest == null) {
			throw new CartException("itemRequest is null");
		}

		if (itemRequest.getProductId() == null) {
			throw new CartException("productId is null");
		}

		User currentUser = userService.getCurrentUser();
		List<Cart> cartList = findActiveCartByUSerIdAndStatus();

		Cart cart = this.deleteItemFromCart(cartList.get(0), itemRequest.getProductId());
		return cartMapper.toDTO(cart);
	}

	@Override
	public List<Cart> findActiveCartByUSerIdAndStatus() {
		return findCartByUSerIdAndStatus(CartStatus.ACTIVE, userService.getCurrentUser().getId()).orElseThrow(() -> new CartException("User has more than one cart"));
	}

	private Optional<List<Cart>> findCartByUSerIdAndStatus(CartStatus status, Long userId) {
		return cartRepository.findCartsByStatusAndUserId(status, userId);
	}

	private Cart createCart(CartItemRequest itemRequest, User currentUser, Product product) {

		CartItem cartItem = buildCartItem(itemRequest, product, null);
		int totalQuantityCart = (int) computeCartProperties(Set.of(cartItem), CartItemCriteria.QUANTITY);
		double totalPriceCart = computeCartProperties(Set.of(cartItem), CartItemCriteria.TOTAL_ITEM_PRICE);
		Cart newCart = Cart.builder().user(currentUser).status(CartStatus.ACTIVE).user(currentUser).totalPrice(totalPriceCart).quantity(totalQuantityCart).build();
		newCart.addItem(cartItem);
		return cartRepository.save(newCart);
	}

	private Cart updateCart(Cart existingCart, CartItemRequest itemRequest, Product product) {

		deleteItemFromCart(existingCart, itemRequest.getProductId());
		if (itemRequest.getQuantity() > 0) {
			CartItem newItem = buildCartItem(itemRequest, product, existingCart);
			existingCart.addItem(newItem);
		}
		int totalQuantityCart = (int) computeCartProperties(existingCart.getItems(), CartItemCriteria.QUANTITY);
		double totalPriceCart = computeCartProperties(existingCart.getItems(), CartItemCriteria.TOTAL_ITEM_PRICE);
		existingCart.setTotalPrice(totalPriceCart);
		existingCart.setQuantity(totalQuantityCart);
		return existingCart;
	}

	private Cart deleteItemFromCart(Cart cart, Long productId) {
		cart.getItems().stream()
				.filter(item -> item.getProduct().getId().equals(productId))
				.findFirst()
				.ifPresent(item -> cart.getItems().remove(item));
		return cart;
	}

	private CartItem buildCartItem(CartItemRequest itemRequest, Product product, Cart cart) {
		return CartItem.builder().quantity(itemRequest.getQuantity()).totalItemPrice(product.getPrice() * itemRequest.getQuantity()).product(product).cart(cart).build();
	}

	private Set<CartItem> removeItemFromCart(Set<CartItem> existingCartItems, long productId) {
		return existingCartItems.stream().filter(cartItem -> !cartItem.getProduct().getId().equals(productId)).collect(Collectors.toSet());
	}

	private double computeCartProperties(Set<CartItem> updatedItemList, CartItemCriteria property) {
		return updatedItemList.stream().mapToDouble(property::getValue).sum();
	}
}
