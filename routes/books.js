const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return next({ status: 400, message: "Title and author required" });
    }

    const newBook = await Book.create({ title, author });
    res.status(201).json(newBook);

  } catch (err) {
    next(err);
  }
});

// READ ALL
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// READ BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next({ status: 404, message: "Book not found" });
    }

    res.json(book);

  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return next({ status: 404, message: "Book not found" });
    }

    res.json(updatedBook);

  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return next({ status: 404, message: "Book not found" });
    }

    res.json({ message: "Book deleted" });

  } catch (err) {
    next(err);
  }
});

module.exports = router;