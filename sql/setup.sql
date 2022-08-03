-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS author_and_book;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL, 
    released SMALLINT NOT NULL 
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob DATE,
    pob VARCHAR
);

CREATE TABLE author_and_book (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO books (title, released) VALUES
('Perdido Street Station', 2000),
('The Name of the Wind', 2007),
('Island', 1962),
('Brave New World', 1932),
('Iron Council', 2004),
('The Lies of Locke Lamora', 2006),
('Red Seas Under Red Skies', 2007),
('The Republic of Thieves', 2013),
('Good Omens', 1990),
('American Gods', 2001),
('A Wise Mans Fear', 2011),
('A Slow Regard for Silent Things', 2014);

INSERT INTO authors (name, dob, pob) VALUES
('Patrick Rothfuss', '1973-06-06', 'Wisconsin, United States'),
('China Mieville', '1972-09-06', 'Norwich, United Kingdom'),
('Aldous Huxley', '1894-07-26', 'Godalming, United Kingdom'),
('Scott Lynch', '1978-04-02', 'Minnesota, United States'),
('Terry Pratchett', '1948-04-28', 'Beaconsfield, United Kingdom'),
('Neil Gaiman', '1960-10-10', 'Portchester, United Kingdom');

INSERT INTO author_and_book (author_id, book_id) VALUES
(2, 1),
(1, 2),
(3, 3),
(3, 4),
(2, 5),
(4, 6),
(4, 7),
(4, 8),
(5, 9),
(6, 9),
(6, 10),
(1, 11),
(1, 12);

