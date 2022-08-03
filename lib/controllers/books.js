const { Router } = require('express');
const router = Router();
const { Books } = require('../models/Books');

router 
  .get('/', async (req, res) => {
    const books = await Books.getAll();
    const ids = books.map((book) => ({ id: book.id, released: book.released }));
    res.json(ids);
  });


module.exports = router;