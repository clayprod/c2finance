import request from 'supertest';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { createApp } from '../src/app';
import { sequelize } from '../src/db';

describe('auth flow', () => {
  let app: ReturnType<typeof createApp>['app'];

  beforeEach(async () => {
    ({ app } = createApp());
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('registers a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'secret' });
    expect(res.status).toBe(201);
  });

  it('fails to register duplicate email', async () => {
    await request(app)
      .post('/register')
      .send({ email: 'dup@example.com', password: 'a' });
    const res = await request(app)
      .post('/register')
      .send({ email: 'dup@example.com', password: 'a' });
    expect(res.status).toBe(409);
  });

  it('login succeeds with correct password', async () => {
    await request(app)
      .post('/register')
      .send({ email: 'log@example.com', password: 'pass' });
    const res = await request(app)
      .post('/login')
      .send({ email: 'log@example.com', password: 'pass' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  it('login fails with wrong password', async () => {
    await request(app)
      .post('/register')
      .send({ email: 'log2@example.com', password: 'pass' });
    const res = await request(app)
      .post('/login')
      .send({ email: 'log2@example.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('access /me with valid token', async () => {
    await request(app)
      .post('/register')
      .send({ email: 'me@example.com', password: 'pass' });
    const login = await request(app)
      .post('/login')
      .send({ email: 'me@example.com', password: 'pass' });
    const token = login.body.token;
    const res = await request(app)
      .get('/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('me@example.com');
  });

  it('denies /me without token', async () => {
    const res = await request(app).get('/me');
    expect(res.status).toBe(401);
  });
});
