const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;
  authors;

  constructor({ id, title, released, authors }) {
    this.id = id;
    this.title = title;
    this.released = released;
    if (authors) {
      this.authors = authors.length > 0 ? authors : [];
    }
  }

  static async getAll() {
    const { rows } = await pool. query('SELECT * FROM books;');
    return rows.map((row) => new Book(row));
  }
}

module.exports = { Book };
