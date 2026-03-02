require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/books");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// Connect ke MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch(err => console.error("MongoDB Error:", err.message));

// Routes
app.use("/api/auth", authRoutes);   // 👈 register & login
app.use("/api/books", bookRoutes); // 👈 CRUD buku

// Error handler (HARUS PALING BAWAH)
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});