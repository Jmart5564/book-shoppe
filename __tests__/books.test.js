const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return the full list of books', async () => {
    const res = await request(app).get('/book');
    expect(res.body.length).toEqual(12);
    const island = res.body.find(
      (book) => book.title === 'Island'
    );
    expect(island).toHaveProperty('released', 1962);
  });

  it('should return a single book by id with author', async () => {
    const res = await request(app).get('/book/1');
    expect(res.body).toEqual({
      title: 'Perdido Street Station',
      released: 2000,
      authors: expect.any(Array)
    });
  });
  afterAll(() => {
    pool.end();
  });
});
