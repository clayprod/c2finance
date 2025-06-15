import request from 'supertest';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { createApp } from '../src/app';
import { sequelize } from '../src/db';

describe('pluggy item flow', () => {
  let app: ReturnType<typeof createApp>['app'];

  beforeEach(async () => {
    ({ app } = createApp());
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('registers a pluggy item for authenticated user', async () => {
    await request(app)
      .post('/register')
      .send({ email: 'plug@test.com', password: 'pass' });

    const login = await request(app)
      .post('/login')
      .send({ email: 'plug@test.com', password: 'pass' });
    const token = login.body.token;

    const res = await request(app)
      .post('/pluggy/item')
      .set('Authorization', `Bearer ${token}`)
      .send({ pluggyItemId: 'item123' });

    expect(res.status).toBe(201);
    expect(res.body.pluggy_item_id).toBe('item123');
    expect(res.body.user_id).toBeTruthy();
  });
});
