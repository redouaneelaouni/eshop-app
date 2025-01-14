package ma.alten.altenshop.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.alten.altenshop.enums.InventoryStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String code;
    private String name;
    private String description;
    private String image;
    private String category;
    private double price;
    private Integer quantity;
    private String internalReference;
    private Long shellId;
    private InventoryStatus inventoryStatus;
    private Integer rating;
    private Long createdAt;
    private Long updatedAt;
}
