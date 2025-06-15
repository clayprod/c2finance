import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { sequelize } from '../src/db';
import { seed, models } from './utils/seed';

const { User, Account, Category, Transaction } = models;

describe('seed helper', () => {
  beforeEach(async () => {
    await seed();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('inserts a user', async () => {
    const count = await User.count();
    expect(count).toBe(1);
  });

  it('inserts linked transaction', async () => {
    const tx = await Transaction.findOne({ include: [Account, Category] });
    expect(tx).toBeTruthy();
    expect(tx!.Account).toBeTruthy();
    expect(tx!.Category).toBeTruthy();
  });
});
