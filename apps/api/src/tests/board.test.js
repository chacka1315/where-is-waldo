import createAgent from './agent';

const agent = createAgent();

describe('GET /api/boards', () => {
  it('should return 200 and all boards', async () => {
    const res = await agent
      .get('/api/boards')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('GET /api/boards/:id', () => {
  it('should return the correct board', async () => {
    const res = await agent.get('/api/boards/2');
    expect(res.body.id).toBe(2);
    expect(res.body.level).toBe(2);
  });

  it('should return null if no id match in the db', async () => {
    const res = await agent.get('/api/boards/100').expect(200).expect(null);
  });
});
