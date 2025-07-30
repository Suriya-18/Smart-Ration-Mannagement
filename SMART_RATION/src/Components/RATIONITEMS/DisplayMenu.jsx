import React, { Component } from "react";
import "./displayStock.css";

class DisplayMenu extends Component {
  state = {
    currentQuantity: this.props.stockDetails.available_quantity,
    productAddedCount: 0,
  };

  addBTn = () => {
    this.setState((prevState) => ({
      productAddedCount:
        prevState.productAddedCount < prevState.currentQuantity
          ? prevState.productAddedCount + 1
          : prevState.productAddedCount,
    }));
  };

  reduceBtn = () => {
    this.setState((prevState) => ({
      productAddedCount:
        prevState.productAddedCount > 0
          ? prevState.productAddedCount - 1
          : 0,
    }));
  };

  addToCart = async () => {
    const { stockDetails } = this.props;
    const { productAddedCount } = this.state;
  
    if (productAddedCount === 0) {
      alert("Please add at least one item to the cart.");
      return;
    }
  
    try {
      // ✅ Get user data from local storage
      const storedData = localStorage.getItem("userData");
      if (!storedData) {
        alert("User not logged in. Please login again.");
        return;
      }
  
      const userData = JSON.parse(storedData);
      if (!userData || !userData.user_id) {
        alert("User ID is missing. Please login again.");
        return;
      }
  
      // Send POST request to server
      const response = await fetch("http://localhost:5000/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userData.user_id,  // Correctly fetched user_id
          item_id: stockDetails.item_id,
          quantity: productAddedCount,
          price_per_unit: stockDetails.price_per_unit
        })
      });
  
      const responseData = await response.json();
      console.log("Server Response:", responseData);
  
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add item to cart");
      }
  
      alert("Item added to cart successfully!");
      this.setState({ productAddedCount: 0 });
  
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert(error.message);
    }
  };
  
  

  render() {
    const { stockDetails } = this.props;
    const { item_name, unit, price_per_unit, item_url } = stockDetails;
    const { currentQuantity, productAddedCount } = this.state;

    return (
      <li className="cardOfImg menuItemCard">
        <img src={item_url} className="item-img" alt={item_name} />
        <h1 className="item-name">{item_name}</h1>
        <p>{currentQuantity} {unit} Available</p>
        <div className="btnCon">
          <button
            type="button"
            onClick={this.reduceBtn}
            className="reduceStockBtn"
          >
            -
          </button>
          <button
            type="button"
            className="addTocartBtn"
            onClick={this.addToCart}
          >
            {productAddedCount} {unit}
            <br />
            Add to cart
          </button>
          <button
            type="button"
            onClick={this.addBTn}
            className="increaseStockBtn"
          >
            +
          </button>
        </div>
        <p className="item-Cost">{price_per_unit}/{unit}</p>
      </li>
    );
  }
}

export default DisplayMenu;