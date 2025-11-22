import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";

function Categories() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  // Fetch all books
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Load existing cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add book to cart
  const handleAddToCart = (book) => {
    const alreadyInCart = cart.find((item) => item._id === book._id);
    if (alreadyInCart) {
      alert("This book is already in your cart!");
      return;
    }
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    alert(`✅ "${book.title}" added to cart!`);
  };

  const categories = ["All", ...new Set(books.map((book) => book.category))];

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="categories-container">
      <h1 className="page-heading">📚 Explore Our Book Collection</h1>

      <div className="category-buttons">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div key={book._id} className="book-card">
            <div className="book-image-wrapper">
              <img
                src={book.image || "https://via.placeholder.com/200x280"}
                alt={book.title}
                className="book-image"
              />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <p className="category">{book.category}</p>
              <p className="price">₹{book.price}</p>
              <button
                className="add-btn"
                onClick={() => handleAddToCart(book)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
