import createAgent from './agent';

describe('GET /api/round?boardid=id', () => {
  const agent = createAgent();

  it('should return the requested board', async () => {
    const res = await agent.get('/api/round?boardid=2').expect(200);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.id).toBe(2);
    expect(res.body.level).toBe(2);
  });
});

describe('POST /api/round/validatexy', () => {
  // req.session.roundStartedAt = Date.now();
  // req.session.charsFoundIds = [];
  // req.session.finished = false;
  // req.session.charsRemainedIds = board.coordinates.map((c) => c.character.id);
  const session = {
    roundStartedAt: Date.now(),
    charsFoundIds: [],
    charsRemainedIds: [1],
  };

  const agent = createAgent(session);
  it('should return success message if position match', async () => {
    const res = await agent
      .get('/api/round/validatexy?boardid=1&x=1&y=2&charId=1')
      .expect(200);
    expect(res.body.msg).toMatch(/you are right/i);
  });

  it('should return failure message if position does not match', async () => {
    const res = await agent
      .get('/api/round/validatexy?boardid=1&x=4&y=2&charId=1')
      .expect(200);
    expect(res.body.msg).toMatch(/you are wrong/i);
  });

  it('should manage correctly the session data table', async () => {
    const res1 = await agent.get(
      '/api/round/validatexy?boardid=1&x=1&y=3&charId=1',
    );
    expect(res1.body.match).toBe(false);
    expect(res1.body.remainedIds).toEqual([1]);
    expect(res1.body.finished).toBe(false);

    const res2 = await agent.get(
      '/api/round/validatexy?boardid=1&x=1&y=2&charId=1',
    );
    expect(res2.body.match).toBe(true);
    expect(res2.body.remainedIds).toEqual([]);
    expect(res2.body.finished).toBe(true);
  });
});
