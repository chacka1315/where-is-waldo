import createAgent from './agent';

const agent = createAgent();

describe('GET api/characters', () => {
  it('should return all characters', async () => {
    const res = await agent
      .get('/api/characters')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveLength(2);
  });
});
