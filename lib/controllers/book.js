const { Router } = require('express');
const router = Router();
const { Book } = require('../models/Book');

router 
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  .get('/:id', async (req, res) => {
    const book = await Book.getById(req.params.id);
    res.json(book);
  })
  .post('/', async (req, res) => {
    const newBook = await Book.insert(req.body);
    res.json(newBook);
  });



module.exports = router;
