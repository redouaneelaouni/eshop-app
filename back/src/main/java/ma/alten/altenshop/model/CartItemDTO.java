package ma.alten.altenshop.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemDTO {

	private Long id;
	private ProductDTO product;
	private int quantity;
	private double totalItemPrice;
}
