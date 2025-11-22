import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  // ✅ Get cart data from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ✅ Remove a single item
  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  // ✅ Clear entire cart
  const handleClearCart = () => {
    localStorage.removeItem("cart");
    window.location.reload();
  };

  // ✅ Go to checkout page
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add some books!</p>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item, index) => (
              <div key={index} className="cart-card">
                <img src={item.image} alt={item.title} className="cart-img" />
                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p>by {item.author}</p>
                  <p className="cart-category">Category: {item.category}</p>
                  <p className="cart-price">₹{item.price}</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Cart summary section */}
          <div className="cart-summary">
            <h3>
              Total: ₹
              {cart.reduce((total, item) => total + Number(item.price || 0), 0)}
            </h3>

            <div className="cart-buttons">
              <button className="clear-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
