package ma.alten.altenshop.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ma.alten.altenshop.constants.RestConstants;
import ma.alten.altenshop.entity.Product;
import ma.alten.altenshop.model.ProductDTO;
import ma.alten.altenshop.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static ma.alten.altenshop.constants.SecurityConstants.ROLE_ADMIN;
import static ma.alten.altenshop.constants.SecurityConstants.ROLE_USER;

@RestController
@RequestMapping(RestConstants.PRODUCTS)
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @PreAuthorize("hasRole("+ ROLE_ADMIN +")")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody @Valid ProductDTO product) {
        ProductDTO createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole("+ ROLE_ADMIN +", "+ ROLE_USER +")")
    public Page<ProductDTO> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return productService.getAllProducts(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
		return ResponseEntity.ok(productService.getProductById(id));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole("+ ROLE_ADMIN +")")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id,
            @RequestBody Product productDetails) {
        ProductDTO updatedProduct = productService.updateProduct(id, productDetails);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole("+ ROLE_ADMIN +")")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}