const { Router } = require('express');
const router = Router();
const { Book } = require('../models/Book');

router 
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  });


module.exports = router;
