import request from 'supertest';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { createApp } from '../src/app';
import { sequelize } from '../src/db';

describe('goal routes', () => {
  let app: ReturnType<typeof createApp>['app'];
  let token: string;

  beforeEach(async () => {
    ({ app } = createApp());
    await sequelize.sync({ force: true });
    await request(app)
      .post('/register')
      .send({ email: 'goal@test.com', password: 'pass' });
    const login = await request(app)
      .post('/login')
      .send({ email: 'goal@test.com', password: 'pass' });
    token = login.body.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('creates, updates and deletes a goal', async () => {
    const create = await request(app)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({ month: '2024-01', amount: 100 });
    expect(create.status).toBe(201);
    const id = create.body.id;

    const list = await request(app)
      .get('/goals')
      .set('Authorization', `Bearer ${token}`);
    expect(list.body.length).toBe(1);

    const update = await request(app)
      .put(`/goals/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 150 });
    expect(update.body.amount).toBe(150);

    const del = await request(app)
      .delete(`/goals/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(204);
  });
});
