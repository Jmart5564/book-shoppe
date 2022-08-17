const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Author.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
  
