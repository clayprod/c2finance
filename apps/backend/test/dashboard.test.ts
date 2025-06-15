import request from 'supertest';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { createApp } from '../src/app';
import { sequelize, Goal, Transaction } from '../src/db';

describe('dashboard monthly', () => {
  let app: ReturnType<typeof createApp>['app'];
  let token: string;
  let userId: string;

  beforeEach(async () => {
    ({ app } = createApp());
    await sequelize.sync({ force: true });
    const reg = await request(app)
      .post('/register')
      .send({ email: 'dash@test.com', password: 'pass' });
    userId = reg.body.id;
    const login = await request(app)
      .post('/login')
      .send({ email: 'dash@test.com', password: 'pass' });
    token = login.body.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('aggregates transactions per month', async () => {
    await Goal.bulkCreate([
      { user_id: userId, month: '2024-01', amount: 200 },
      { user_id: userId, month: '2024-02', amount: 100 },
    ]);
    await Transaction.bulkCreate([
      { user_id: userId, amount: 50, date: new Date('2024-01-05') },
      { user_id: userId, amount: 30, date: new Date('2024-02-10') },
      { user_id: userId, amount: 20, date: new Date('2024-02-15') },
    ]);

    const res = await request(app)
      .get('/dashboard/monthly')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { month: '2024-01', goal: 200, spent: 50 },
      { month: '2024-02', goal: 100, spent: 50 },
    ]);
  });
});
