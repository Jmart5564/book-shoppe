const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return the full list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(6);
    const patrick = res.body.find(
      (author) => author.name === 'Patrick Rothfuss'
    );
    expect(patrick).toHaveProperty('dob', '1973-06-06');
    expect(patrick).toHaveProperty('pob', 'Wisconsin, United States');
    
  });
  it('#GET /authors/:id should return a single author', async () => {
    const resp = await request(app).get('/authors/2');
    expect(resp.body).toEqual({
      name: 'China Mieville',
      dob: '1972-09-06',
      pob: 'Norwich, United Kingdom',
      books: expect.any(Array) 
    });
  });
  it('#POST /authors should create a new author', async () => {
    const newAuthor = {
      name: 'Nick Martin',
      dob: '1990-04-03',
      pob: 'Oregon, United States'
    };
    const resp = await request(app).post('/authors').send(newAuthor);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newAuthor,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
