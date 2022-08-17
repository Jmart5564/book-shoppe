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

  afterAll(() => {
    pool.end();
  });
});
