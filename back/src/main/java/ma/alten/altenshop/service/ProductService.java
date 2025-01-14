package ma.alten.altenshop.service;

import ma.alten.altenshop.entity.Product;
import ma.alten.altenshop.model.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

	ProductDTO createProduct(ProductDTO product);
	Page<ProductDTO> getAllProducts(Pageable pageable);
	ProductDTO getProductById(Long id);
	ProductDTO updateProduct(Long id, Product productDetails);
	void deleteProduct(Long id);
}
