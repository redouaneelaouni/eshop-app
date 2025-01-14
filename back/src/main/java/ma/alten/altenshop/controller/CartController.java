package ma.alten.altenshop.controller;

import lombok.RequiredArgsConstructor;
import ma.alten.altenshop.entity.Cart;
import ma.alten.altenshop.mapper.CartMapper;
import ma.alten.altenshop.model.CartDTO;
import ma.alten.altenshop.model.CartItemRequest;
import ma.alten.altenshop.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static ma.alten.altenshop.constants.RestConstants.CART;
import static ma.alten.altenshop.constants.SecurityConstants.ROLE_ADMIN;
import static ma.alten.altenshop.constants.SecurityConstants.ROLE_USER;

@RestController
@RequestMapping(CART)
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final CartMapper cartMapper;

    @GetMapping()
    @PreAuthorize("hasAnyRole("+ ROLE_ADMIN +", "+ ROLE_USER +")")
    public ResponseEntity<CartDTO> getActiveCart() {
        List<Cart> activeCart = cartService.findActiveCartByUSerIdAndStatus();
        if (activeCart.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        CartDTO cartDTO = cartMapper.toDTO(activeCart.get(0));
        return ResponseEntity.ok(cartDTO);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole("+ ROLE_ADMIN +", "+ ROLE_USER +")")
    public ResponseEntity<CartDTO> createOrUpdateCart(@RequestBody CartItemRequest itemRequest) {
        CartDTO cart = cartService.createOrUpdateCart(itemRequest);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole("+ ROLE_ADMIN +", "+ ROLE_USER +")")
    public ResponseEntity<CartDTO> deleteItemFromCart(@RequestBody CartItemRequest itemRequest) {
        CartDTO cart = cartService.deleteItemFromCart(itemRequest);
        return ResponseEntity.ok(cart);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}