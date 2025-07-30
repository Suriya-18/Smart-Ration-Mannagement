import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Homepage.css";

const Homepage = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const [userData, setUserData] = React.useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            setUserData(JSON.parse(storedData));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleMenuClick = () => {
        navigate("/menuforcitizens");
    };

    const handleLogout = () => {
        localStorage.removeItem("userData");
        navigate("/login");
    };

    return (
        <>
            {/* Navbar - Restored exactly as before */}
            <nav className="navbar navbar-expand-lg navbar-light bg34 fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img
                            src="https://i.pinimg.com/564x/37/2d/30/372d300ed089b345c2a8c9d03233e35d.jpg"
                            className="logo1"
                            alt="Logo"
                        />
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                        <div className="navbar-nav">
                            <a className="nav-link active" href="#wcu-section">
                                Why Choose Us?
                            </a>
                            <button className="nav-link btn btn-link" onClick={handleMenuClick}>
                                Explore Menu
                            </button>
                            <button className="nav-link btn btn-link" onClick={()=>navigate(`/cartproduct/${userData.user_id}`)}>
                                Your Cart
                            </button>
                            <a className="nav-link" href="#payment">
                                Delivery and Payments
                            </a>
                            <a className="nav-link" href="#follow-us">
                                Follow Us
                            </a>
                            {userData && (
                                <>
                                    <span className="nav-link">Welcome, {userData.name}</span>
                                    <button className="nav-link btn btn-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content - Restored exactly as before */}
            <div className="bg-con d-flex flex-column justify-content-center">
                <div className="text-center">
                    <h1 className="headmain mb-3">Online Ration Management System</h1>
                    <p className="paramain mb-4">Pre-Book and get your goods</p>
                    {userData ? (
                        <>
                            <button className="button2"onClick={() => navigate(`/citizenorderpage/${userData.user_id}`)}>
                                My Orders
                            </button>
                            <button className="button2" onClick={handleMenuClick}>
                                Explore Menu
                            </button>
                        </>
                    ) : (
                        <p>Please log in to access services.</p>
                    )}
                </div>
            </div>

            {/* WCU Section - Restored exactly as before */}
            <div className="wcu-section pt-5 pb-5" id="wcu-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="wcu-head">Why Choose Us?</h1>
                            <p className="wcu-para">
                                Streamline your ration management with our digital platform! Update stock in real-time, 
                                track allocations, and simplify distribution—all in one place.
                            </p>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="wcu-card p-3 mt-3">
                                <img 
                                    src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-serve.png" 
                                    className="wcu-card-image" 
                                    alt="Service" 
                                />
                                <h1 className="wcu-card-title mt-3">Seamless Stock Management</h1>
                                <p className="wcu-card-desc">
                                    Monitor stock levels, receive alerts for low inventory, and ensure timely restocking.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="wcu-card p-3 mt-3">
                                <img 
                                    src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/fruits-img.png" 
                                    className="wcu-card-image" 
                                    alt="Fruits" 
                                />
                                <h1 className="wcu-card-title mt-3">Efficient Ration Distribution</h1>
                                <p className="wcu-card-desc">
                                    Ensure fair allocation through automated quota tracking and digital token-based collection.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="wcu-card p-3 mt-3">
                                <img 
                                    src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/offers-img.png" 
                                    className="wcu-card-image" 
                                    alt="Offers" 
                                />
                                <h1 className="wcu-card-title mt-3">Government-Backed Compliance</h1>
                                <p className="wcu-card-desc">
                                    Our system ensures that distribution policies align with government regulations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery and Payment Section - Restored exactly as before */}
            <div className="delivery-and-payment-section pt-5 pb-5" id="payment">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 order-1 order-md-2">
                            <div className="text-center">
                                <img 
                                    src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/delivery-payment-section-img.png" 
                                    className="delivery-and-payment-section-img" 
                                    alt="Delivery" 
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-7 order-2 order-md-1">
                            <h1 className="delivery-and-payment-section-heading">
                                Delivery and Payment
                            </h1>
                            <p className="delivery-and-payment-section-description">
                                Accept government-authorized payments seamlessly and manage vendor transactions efficiently.
                            </p>
                            <button className="custom-button">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section - Restored exactly as before */}
            <div className="footer-section pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <img 
                                src="https://i.pinimg.com/564x/37/2d/30/372d300ed089b345c2a8c9d03233e35d.jpg" 
                                className="food-munch-logo" 
                                alt="Logo" 
                            />
                            <h1 className="footer-section-mail-id">sepmsmartration@sepmsrmist.com</h1>
                            <p className="footer-section-address">
                                SRM University, Kattankulathur, Chengalpattu
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;