package ma.alten.altenshop.mapper;

import ma.alten.altenshop.entity.CartItem;
import ma.alten.altenshop.model.CartItemDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

	CartItem toEntity(CartItemDTO cartItemDTO);
	CartItemDTO toCartItemDTO(CartItem cartItem);
	List<CartItemDTO> toCartItemDTOs(List<CartItem> cartItems);
	List<CartItem> toCartItemEntity(List<CartItemDTO> cartItemDTOs);
}
