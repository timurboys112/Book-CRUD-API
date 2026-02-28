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

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});