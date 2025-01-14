package ma.alten.altenshop.mapper;

import ma.alten.altenshop.entity.Product;
import ma.alten.altenshop.model.ProductDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductDTO toDto(Product product);
    List<ProductDTO> toDtoList(List<Product> products);
    
    @Mapping(target = "id", ignore = true)
    Product toEntity(ProductDTO productDTO);
}