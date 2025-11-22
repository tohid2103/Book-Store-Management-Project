import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Load items from localStorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInfo.name || !userInfo.address || !userInfo.phone) {
      alert("Please fill all details before proceeding.");
      return;
    }

    setTimeout(() => {
      localStorage.removeItem("cart");
      setSuccess(true);
    }, 800);
  };

  if (success) {
    return (
      <div className="checkout-success">
        <h1>✅ Payment Successful!</h1>
        <p>
          Thank you, <strong>{userInfo.name}</strong>! Your order has been
          placed successfully.
        </p>
        <button
          className="back-home-btn"
          onClick={() => navigate("/home")}
        >
          🏠 Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">💳 Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-items">
          <h2>Order Summary</h2>
          {cartItems.map((book) => (
            <div key={book._id} className="checkout-item">
              <img
                src={book.image || "https://via.placeholder.com/100"}
                alt={book.title}
              />
              <div>
                <h3>{book.title}</h3>
                <p>₹ {book.price}</p>
              </div>
            </div>
          ))}
          <h2 className="checkout-total">Total: ₹ {totalPrice}</h2>
        </div>

        <div className="checkout-form">
          <h2>Shipping Details</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userInfo.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              value={userInfo.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={userInfo.phone}
              onChange={handleChange}
              required
            />
            <button type="submit" className="pay-btn">
              Pay ₹ {totalPrice}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
