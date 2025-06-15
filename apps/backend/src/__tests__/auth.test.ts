import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import app from '../app';
import sequelize from '../models';
import User from '../models/User';

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

describe('auth flow', () => {
  it('registers a user', async () => {
    const res = await request(app).post('/auth/register').send({
      email: 'test@example.com',
      password: 'password',
    });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe('test@example.com');
  });

  it('logs in successfully', async () => {
    await User.create({
      email: 'test@example.com',
      passwordHash: 'hashed',
    });
    const bcrypt = await import('bcryptjs');
    const user = await User.findOne({ where: { email: 'test@example.com' } });
    if (user) {
      user.passwordHash = await bcrypt.default.hash('password', 10);
      await user.save();
    }
    const res = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: 'password',
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  it('fails login with wrong password', async () => {
    const bcrypt = await import('bcryptjs');
    await User.create({
      email: 'test@example.com',
      passwordHash: await bcrypt.default.hash('password', 10),
    });
    const res = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: 'wrong',
    });
    expect(res.status).toBe(401);
  });

  it('accesses protected route', async () => {
    const bcrypt = await import('bcryptjs');
    await User.create({
      email: 'test@example.com',
      passwordHash: await bcrypt.default.hash('password', 10),
    });
    const login = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: 'password',
    });
    const res = await request(app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${login.body.token}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('test@example.com');
  });
});
