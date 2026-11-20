const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');

const router = express.Router();

function checkId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'id invalide' });
  }
  next();
}

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.get('/:id', checkId, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Livre introuvable' });
  res.json(book);
});

router.post('/', async (req, res) => {
  try {
    const { title, author, page } = req.body;
    const book = await Book.create({ title, author, page });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', checkId, async (req, res) => {
  try {
    const { title, author, page } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, page },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ error: 'Livre introuvable' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', checkId, async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ error: 'Livre introuvable' });
  res.status(204).send();
});

module.exports = router;
