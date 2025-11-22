import React, { useState } from "react";
import axios from "axios";
import "./AddBook.css";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  // handle input changes
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/books/add", book);

      if (res.status === 201) {
        setMessage("✅ Book added successfully!");
        setBook({ title: "", author: "", category: "", price: "", image: "" });
      }
    } catch (err) {
      console.error("Error adding book:", err);
      setMessage("❌ Failed to add book. Please try again.");
    }
  };

  return (
    <div className="addbook-wrapper">
      <div className="addbook-card">
        <h2>Add a New Book</h2>

        <form onSubmit={handleSubmit} className="addbook-form">
          <div className="input-group">
            <input
              type="text"
              name="title"
              placeholder="📖 Book Title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="author"
              placeholder="👨‍💼 Author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="category"
              placeholder="🏷️ Category (e.g. Fiction, Science)"
              value={book.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              name="price"
              placeholder="💰 Price"
              value={book.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="image"
              placeholder="🖼️ Image URL"
              value={book.image}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="add-btn">
            ➕ Add Book
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default AddBook;
