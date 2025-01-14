package ma.alten.altenshop.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CartDTO {

    private Long id;
    private List<CartItemDTO> items;
    private double totalPrice;
    private int quantity;
}

