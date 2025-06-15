import { describe, it, expect } from 'vitest';
import sequelize from './database';

describe('database config', () => {
  it('uses postgres dialect in test env', () => {
    expect(sequelize.getDialect()).toBe('postgres');
  });
});
