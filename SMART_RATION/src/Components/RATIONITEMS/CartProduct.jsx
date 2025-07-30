import { Component } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import "./cartProduct.css";
import { withRouter } from "../FRONTLOGINSIGNUP/withRouter";

class CartProduct extends Component {
    
    state = {
        cartItems: [],
        userData: JSON.parse(localStorage.getItem("userData")) || null,
    };

    componentDidMount() {
        this.fetchCartItems();
    }

    fetchCartItems = async () => {
        try {
            const { userData } = this.state;
            const userId = userData?.user_id;
            if (!userId) {
                console.error("User ID not found in userData");
                return;
            }

            const response = await fetch(`http://localhost:5000/cartproduct/${userId}`);
            const data = await response.json();

            if (data.cartItems) {
                const cartItems = data.cartItems;
                const grandTotal = cartItems.reduce((sum, item) => sum + (item.total_price || 0), 0);

                // ✅ Store grand total in localStorage
                localStorage.setItem("grandTotal", JSON.stringify(grandTotal));
                console.log("Response from backend:", data);

                if (cartItems.length > 0 && cartItems[0].cart_id) {
                    localStorage.setItem("cart_id", cartItems[0].cart_id);
                    console.log("Storing cart_id:", cartItems[0].cart_id);
                    console.log("LocalStorage cart_id:", localStorage.getItem("cart_id"));

                }
                
                this.setState({ cartItems });
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    handleRemove = async (cart_product_id) => {
        if (!cart_product_id) {
            console.error("Invalid cart_product_id");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/removeFromCart/${cart_product_id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                const updatedItems = this.state.cartItems.filter(item => item.cart_product_id !== cart_product_id);

                // Update grand total
                if (updatedItems.length > 0) {
                    const updatedTotal = updatedItems.reduce((sum, item) => sum + (item.total_price || 0), 0);
                    localStorage.setItem("grandTotal", JSON.stringify(updatedTotal));
                } else {
                    localStorage.removeItem("grandTotal");
                }

                this.setState({ cartItems: updatedItems });
                alert(data.message);
            } else {
                console.warn("Server failed to delete item:", data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error("Network error while removing item:", error);
            alert("Something went wrong while deleting.");
        }
    };

    handleBookNow = () => {
        const { userData } = this.state;
        const userId = userData?.user_id;
        if (userId) {
            this.props.navigate(`/bookingpage/${userId}`);
        }
    };
    handleGoToMenu = () => {
        this.props.navigate("/menuforcitizens"); // Updated navigation
    };

    render() {
        
        const { cartItems } = this.state;

        return (
            <div>
                <h1>Your Cart</h1>
                {cartItems.length>0?<button type="button" onClick={this.handleBookNow}>Book Now</button>:<p></p>}
                <button type="button" onClick={this.handleGoToMenu}>Go To Menu</button>
                <ul>
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <CartItem
                                key={item.cart_product_id}
                                cartItem11={item}
                                onItemRemoved={this.handleRemove}
                            />
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </ul>
            </div>
        );
    }
}

export default withRouter(CartProduct);