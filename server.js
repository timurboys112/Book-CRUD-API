require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/books");

const app = express();

// Middleware
app.use(express.json());

// Connect ke MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch(err => console.error("MongoDB Error:", err.message));

// Routes
app.use("/api/books", bookRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});