const express = require("express");
const app = express();
const bookRoutes = require("./routes/books");

app.use(express.json());

// routes
app.use("/api/books", bookRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://anindyabulan16_db_user:Moon1607@cluster0.raht8jf.mongodb.net/bookdb?retryWrites=true&w=majority&authSource=admin"
)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});