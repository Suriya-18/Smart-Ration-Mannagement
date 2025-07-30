import { Component } from "react";
import { withRouter } from "../FRONTLOGINSIGNUP/withRouter";
import DisplayMenu from "../RATIONITEMS/DisplayMenu";
import "./displayStock.css";

class MenuforCitizens extends Component {
    state = {
        stockItems: [],
        userData: JSON.parse(localStorage.getItem("userData")) || null,
    };

    async componentDidMount() {
        if (!this.state.userData) {
            alert("Please login to access the menu");
            this.props.navigate("/login");
            return;
        }
        this.fetchStockData();
    }

    fetchStockData = async () => {
        try {
            const response = await fetch("http://localhost:5000/vendorstockmanagement");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            this.setState({ stockItems: data });
            
        } catch (error) {
            console.error("Error fetching stock data:", error);
            alert("Failed to load menu items");
        }
    };

    render() {
        const { userData, stockItems } = this.state;

        return (
            <div className="mainCon">
                <h1 className="heady">Available Products</h1>
                
                {userData && (
                    <div className="user-greeting">
                        <span>Welcome, {userData.name}</span>
                        
                        <button 
                        className="view-cart-btn"
                        onClick={() => this.props.navigate(`/cartproduct/${userData.user_id}`)} // Use backticks
                        >
                        View Your Cart
                        </button>
                        <button onClick={()=>this.props.navigate('/homepage')} type="button" className="view-cart-btn">Go To Homepage</button>
                    </div>
                )}

                <ul className="img-card">
                    {stockItems.length > 0 ? (
                        stockItems.map((item) => (
                            <DisplayMenu
                                key={item.item_id}
                                stockDetails={item}
                            />
                        ))
                    ) : (
                        <p className="no-items">No products available currently</p>
                    )}
                </ul>
            </div>
        );
    }
}

export default withRouter(MenuforCitizens);