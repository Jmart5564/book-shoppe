
const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor({ id, name, dob, pob, books }) {
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.pob = pob;
    if (books) {
      this.books = 
          books.length > 0 ? books : [];
    }
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM authors;');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      authors.name, authors.dob, authors.pob, 
      COALESCE(
        json_agg(json_build_object(
          'id', books.id, 
          'title', books.title, 
          'released', books.released))
        FILTER (WHERE books.id IS NOT NULL), '[]'
      ) as books from authors 
      LEFT JOIN author_and_book on authors.id = author_and_book.author_id 
      LEFT JOIN books on author_and_book.book_id = books.id
      WHERE authors.id = $1
      GROUP BY authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) RETURNING *',
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }
}

module.exports = { Author };
