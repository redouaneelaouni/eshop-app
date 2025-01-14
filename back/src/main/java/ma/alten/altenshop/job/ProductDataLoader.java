package ma.alten.altenshop.job;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import ma.alten.altenshop.entity.Product;
import ma.alten.altenshop.enums.InventoryStatus;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static ma.alten.altenshop.enums.Role.ROLE_ADMIN;
import static ma.alten.altenshop.enums.Role.ROLE_USER;

@Component
@Slf4j
public class ProductDataLoader implements CommandLineRunner {

    private static final String PRODUCTS_JSON_PATH = "products.json";

    private final ObjectMapper objectMapper;
    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    public ProductDataLoader(ObjectMapper objectMapper, JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {
        this.objectMapper = objectMapper;
        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        loadDefaultUsers();
        loadProducts();
    }

    private void loadDefaultUsers() {
        try {
            Long userCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users", Long.class);

            if (userCount != null && userCount == 0) {
                log.info("Starting to load default users");

                // Admin user
                jdbcTemplate.update("INSERT INTO users (email, firstname, username, password, role) VALUES (?, ?, ?, ?, ?)", "admin@admin.com", "Admin", "admin@admin.com", passwordEncoder.encode("admin123"), ROLE_ADMIN.name());

                // Regular user
                jdbcTemplate.update("INSERT INTO users (email, firstname, username, password, role) VALUES (?, ?, ?, ?, ?)", "user@user.com", "User", "user@user.com", passwordEncoder.encode("user123"), ROLE_USER.name());

                log.info("Successfully loaded default users");
            }
        } catch (Exception e) {
            log.error("Error while loading default users", e);
            throw new RuntimeException("Could not load default users", e);
        }
    }

    private void loadProducts() {
        try {
            Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM products", Long.class);

            if (count != null && count == 0) {
                log.info("Starting to load products from JSON");

                Resource resource = new ClassPathResource(PRODUCTS_JSON_PATH);
                List<Product> products = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Product>>() {
                });

                // Validation et transformation des données
                products.forEach(product -> {
                    if (product.getInventoryStatus() == null) {
                        product.setInventoryStatus(InventoryStatus.INSTOCK);
                    }
                });

                jdbcTemplate.batchUpdate("INSERT INTO products (id, code, name, description, image, price, category, " + "internal_reference, shell_id, inventory_status, rating, created_at, updated_at) " + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", products.stream().map(p -> new Object[]{p.getId(), p.getCode(), p.getName(), p.getDescription(), p.getImage(), p.getPrice(), p.getCategory(), p.getInternalReference(), p.getShellId(), p.getInventoryStatus().name(), p.getRating(), p.getCreatedAt(), p.getUpdatedAt()}).collect(Collectors.toList()));

                // Mettre à jour la séquence
                Long maxId = products.stream().mapToLong(Product::getId).max().orElse(0L);

                jdbcTemplate.execute("ALTER SEQUENCE product_seq RESTART WITH " + (maxId + 1));

                log.info("Successfully loaded {} products", products.size());
            } else {
                log.info("Products already exist in database, skipping data load");
            }
        } catch (Exception e) {
            log.error("Error while loading products from JSON", e);
            throw new RuntimeException("Could not load products from JSON", e);
        }
    }
}