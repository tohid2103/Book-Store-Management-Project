const express = require("express");
const router = express.Router();
const Issue = require("../models/issueModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

// ✅ Fetch all issued books (with user + book populated)
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("user", "name email")
      .populate("book", "title author");
    res.json(issues);
  } catch (error) {
    console.error("❌ Error fetching issued books:", error);
    res.status(500).json({ message: "Error fetching issued books" });
  }
});

// ✅ Issue a new book
router.post("/", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId)
      return res.status(400).json({ message: "User and Book are required" });

    const issue = new Issue({
      user: userId,
      book: bookId,
      issueDate: new Date(),
    });

    await issue.save();

    // Re-fetch with populated user & book info
    const populatedIssue = await Issue.findById(issue._id)
      .populate("user", "name email")
      .populate("book", "title author");

    res.status(201).json(populatedIssue);
  } catch (error) {
    console.error("❌ Error issuing book:", error);
    res.status(500).json({ message: "Error issuing book" });
  }
});

// ✅ Return (delete) a book
router.delete("/return/:id", async (req, res) => {
  try {
    const issueId = req.params.id;
    const issue = await Issue.findById(issueId)
      .populate("user", "name")
      .populate("book", "title");

    if (!issue) {
      return res.status(404).json({ message: "Issue record not found" });
    }

    await Issue.findByIdAndDelete(issueId);
    res.status(200).json({
      message: "Book returned successfully",
      user: issue.user?.name,
      book: issue.book?.title,
    });
  } catch (error) {
    console.error("❌ Error returning book:", error);
    res.status(500).json({ message: "Error returning book" });
  }
});

module.exports = router;
