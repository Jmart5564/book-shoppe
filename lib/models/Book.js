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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.title, books.released, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors.id IS NOT NULL), '[]'
        ) 
        AS authors 
        FROM books 
        LEFT JOIN author_and_book 
        ON books.id = author_and_book.book_id 
        LEFT JOIN authors 
        ON author_and_book.author_id = authors.id
        WHERE books.id = $1
        GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      `INSERT INTO books (title, released)
      VALUES ($1, $2) RETURNING *`, [title, released]);
    return new Book(rows[0]);
  }
}

module.exports = { Book };
