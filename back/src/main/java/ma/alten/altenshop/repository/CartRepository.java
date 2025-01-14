package ma.alten.altenshop.repository;

import ma.alten.altenshop.entity.Cart;
import ma.alten.altenshop.enums.CartStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {

	Optional<List<Cart>> findCartsByStatusAndUserId(CartStatus status, Long userId);
}