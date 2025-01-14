package ma.alten.altenshop.enums;

import ma.alten.altenshop.entity.CartItem;

public enum CartItemCriteria {

    QUANTITY {
        @Override
        public double getValue(CartItem item) {
            return item.getQuantity();
        }
    },
    TOTAL_ITEM_PRICE {
        @Override
        public double getValue(CartItem item) {
            return item.getTotalItemPrice();
        }
    };

    public abstract double getValue(CartItem item);
}