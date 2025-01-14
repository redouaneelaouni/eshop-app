package ma.alten.altenshop.entity;

import jakarta.persistence.*;
import lombok.*;
import ma.alten.altenshop.enums.CartStatus;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "carts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItem> items = new HashSet<>();
    
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private CartStatus status;

    private int quantity;

    private double totalPrice;
    
    public void addItem(CartItem item) {
        if (this.items == null) {
            this.items = new HashSet<>();
        }
        this.items.add(item);
        item.setCart(this);
    }
    
    public void removeItem(CartItem item) {
        items.remove(item);
        item.setCart(null);
    }
}