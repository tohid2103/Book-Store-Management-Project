const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");

// ✅ GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error.message);
    res.status(500).json({ message: "Server error while fetching books" });
  }
});

// ✅ GET single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("❌ Error fetching book:", error.message);
    res.status(500).json({ message: "Failed to fetch book" });
  }
});

// ✅ ADD new book
router.post("/add", async (req, res) => {
  try {
    const { title, author, price, category, image } = req.body;

    // Validation
    if (!title || !author || !price || !category) {
      return res.status(400).json({ message: "⚠️ All fields are required" });
    }

    const newBook = new Book({
      title,
      author,
      price,
      category,
      image: image || "https://via.placeholder.com/150", // Default image
    });

    const savedBook = await newBook.save();
    res.status(201).json({
      message: "✅ Book added successfully!",
      book: savedBook,
    });
  } catch (error) {
    console.error("❌ Error adding book:", error.message);
    res.status(500).json({ message: "❌ Failed to add book." });
  }
});

// ✅ UPDATE book by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { title, author, price, category, image } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, price, category, image },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "✅ Book updated successfully!",
      book: updatedBook,
    });
  } catch (error) {
    console.error("❌ Error updating book:", error.message);
    res.status(500).json({ message: "❌ Failed to update book." });
  }
});

// ✅ DELETE book by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "✅ Book deleted successfully!",
      deletedBook,
    });
  } catch (error) {
    console.error("❌ Error deleting book:", error.message);
    res.status(500).json({ message: "❌ Failed to delete book." });
  }
});

module.exports = router;
