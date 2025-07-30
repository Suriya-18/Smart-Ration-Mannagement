import React from "react";
import "./cartItem.css";

const CartItem = ({ cartItem11, onItemRemoved }) => {
    const { cart_product_id, item_name, quantity, price_per_unit, item_url } = cartItem11;

    const handleRemove = () => {
        console.log("Removing item with cart_product_id:", cart_product_id); // Debug log
        if (!cart_product_id) {
            console.error("Error: cart_product_id is undefined!");
            return;
        }

        if (window.confirm("Are you sure you want to remove this item?")) {
            onItemRemoved(cart_product_id);
        }
    };

    return (
        <li className="cart-item">
            <img src={item_url} alt={item_name} className="product-image" />
            <div className="item-details">
                <h1>{item_name}</h1>
                <p>Quantity: {quantity}</p>
                <p>Price per Unit: ₹{price_per_unit}</p>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </li>
    );
};

export default CartItem;