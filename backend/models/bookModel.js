const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true }, // ✅ Add this line
  image: { type: String, required: false },
});

module.exports = mongoose.model("Book", bookSchema);
