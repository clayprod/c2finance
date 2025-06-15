import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { createApp } from '../src/app';

describe('advisor suggestion', () => {
  it('returns a mocked recommendation', async () => {
    const { app } = createApp();
    const res = await request(app).get('/advisor/suggestion');
    expect(res.status).toBe(200);
    expect(res.body.suggestion).toBeTruthy();
  });
});
