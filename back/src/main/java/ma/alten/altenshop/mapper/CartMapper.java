package ma.alten.altenshop.mapper;

import ma.alten.altenshop.entity.Cart;
import ma.alten.altenshop.model.CartDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {


    Cart toEntity(CartDTO cartDTO);
    CartDTO toDTO(Cart cart);
}