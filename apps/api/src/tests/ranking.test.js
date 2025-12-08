import createAgent from './agent';

describe('GET /api/boards/:id/ranking', () => {
  const agent = createAgent();
  it('should return empty rank/ings and the correct board', async () => {
    const res = await agent
      .get('/api/boards/1/ranking')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Object.keys(res.body)).toEqual(['board', 'rankings']);
    expect(res.body.rankings).toEqual([]);
  });

  it('should return a bad request response if id is not an int', async () => {
    const res = await agent.get('/api/boards/foo/ranking').expect(400);
  });
});

describe('POST /api/boards/:id/ranking', () => {
  it('should add a new player to the correct leaderboard', async () => {
    const agent = createAgent({ score: 1357 });

    const res = await agent
      .post('/api/boards/1/ranking')
      .send({ playerName: 'Thor' })
      .expect(201);

    expect(res.body.boardId).toBe(1);
    expect(res.body.playerName).toMatch(/thor/i);
    expect(res.body.time).toBe(1357);

    const getRes = await agent
      .get('/api/boards/1/ranking')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(getRes.body.rankings.length).toBe(1);
  });

  it('should not create a data if player has not won the part', async () => {
    const agent = createAgent();
    const res = await agent
      .post('/api/boards/2/ranking')
      .send({ playerName: 'Thor' })
      .expect(400);
  });

  it('should respond with bad request if player name fails validation', async () => {
    const agent = createAgent();
    const res = await agent
      .post('/api/boards/2/ranking')
      .send({ playerName: '<>' })
      .expect(400)
      .expect('Content-Type', /json/);
  });
});
