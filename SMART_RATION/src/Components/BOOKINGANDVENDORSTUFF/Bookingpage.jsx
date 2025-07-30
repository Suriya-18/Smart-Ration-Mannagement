import { useEffect, useState } from "react";
import { withRouter } from "../FRONTLOGINSIGNUP/withRouter";

const Bookingpage = ({ navigate }) => {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [specialRequests, setSpecialRequests] = useState("");
  const [userData, setUserData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const storedGrandTotal = localStorage.getItem("grandTotal");

    if (storedUserData) {
      setUserData(storedUserData);
    }

    if (storedGrandTotal) {
      setGrandTotal(parseFloat(storedGrandTotal));
    }
  }, []);

  useEffect(() => {
    const isValid =
      userData?.user_id &&
      userData?.name &&
      userData?.address &&
      grandTotal > 0 &&
      deliveryMethod &&
      paymentMethod;
    setIsFormValid(isValid);
  }, [userData, grandTotal, deliveryMethod, paymentMethod]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Booking placed successfully!");
      
      
    
    if (!isFormValid) return;

    setIsSubmitting(true);
    setError("");

    try {
      const cartId = JSON.parse(localStorage.getItem("cart_id")); // match the exact key


      const response = await fetch(
        `http://localhost:5000/createBooking/${userData.user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart_id: cartId,
            name: userData.name,
            address: userData.address,
            total_cost: grandTotal,
            ration_number: userData.ration_number,
            delivery_method: deliveryMethod,
            payment_method: paymentMethod,
            special_requests: specialRequests,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Booking failed");
      }

      alert("Booking placed successfully!");
      
      
      navigate(`/citizenorderpage/${userData.user_id}`);
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Hi {userData.name || "User"}</h1>
      <p>RATION NUMBER: {userData.ration_number || "Not provided"}</p>

      <form onSubmit={handleSubmit}>
        <h2>Delivery Method</h2>
        <div>
          <label>
            <input
              type="radio"
              value="delivery"
              checked={deliveryMethod === "delivery"}
              onChange={() => setDeliveryMethod("delivery")}
            />
            Delivery
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              value="pickup"
              checked={deliveryMethod === "pickup"}
              onChange={() => setDeliveryMethod("pickup")}
            />
            Pickup
          </label>
        </div>

        {deliveryMethod === "delivery" && (
          <div style={{ margin: "15px 0" }}>
            <p><strong>Your Address:</strong></p>
            <p>{userData.address || "No address available"}</p>
          </div>
        )}

        <h2>Payment Method</h2>
        <div>
          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Card Payment
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === "card" && (
          <div style={{ margin: "15px 0" }}>
            <input
              type="text"
              placeholder="Card Number"
              required
              style={{ margin: "5px 0", width: "100%" }}
            />
            <input
              type="text"
              placeholder="CVV"
              required
              style={{ margin: "5px 0", width: "100%" }}
            />
            <input
              type="password"
              placeholder="Card Password"
              required
              style={{ margin: "5px 0", width: "100%" }}
            />
          </div>
        )}

        <h2>Special Requests</h2>
        <textarea
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Any specific instructions or requests?"
          style={{ width: "100%", minHeight: "80px", margin: "5px 0" }}
        />

        <div style={{ margin: "20px 0" }}>
          <h2>Total Price: ₹{grandTotal.toFixed(2)}</h2>
        </div>

        {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          style={{
            padding: "10px 20px",
            background: isFormValid ? "#4CAF50" : "#cccccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          {isSubmitting ? "Processing..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
};

export default withRouter(Bookingpage);