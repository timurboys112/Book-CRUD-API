const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/books.json");

// helper baca file
const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// helper tulis file
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// CREATE
router.post("/", (req, res, next) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return next({ status: 400, message: "Title and author required" });
  }

  const books = readData();
  const newBook = {
    id: Date.now(),
    title,
    author,
  };

  books.push(newBook);
  writeData(books);

  res.status(201).json(newBook);
});

// READ ALL
router.get("/", (req, res) => {
  const books = readData();
  res.json(books);
});

// READ BY ID
router.get("/:id", (req, res, next) => {
  const books = readData();
  const book = books.find(b => b.id == req.params.id);

  if (!book) {
    return next({ status: 404, message: "Book not found" });
  }

  res.json(book);
});

// UPDATE
router.put("/:id", (req, res, next) => {
  const books = readData();
  const index = books.findIndex(b => b.id == req.params.id);

  if (index === -1) {
    return next({ status: 404, message: "Book not found" });
  }

  books[index] = { ...books[index], ...req.body };
  writeData(books);

  res.json(books[index]);
});

// DELETE
router.delete("/:id", (req, res, next) => {
  const books = readData();
  const newBooks = books.filter(b => b.id != req.params.id);

  if (books.length === newBooks.length) {
    return next({ status: 404, message: "Book not found" });
  }

  writeData(newBooks);
  res.json({ message: "Book deleted" });
});

module.exports = router;