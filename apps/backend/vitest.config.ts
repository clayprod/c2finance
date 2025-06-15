import { defineConfig } from 'vitest/config';
import path from 'path';
import dotenv from 'dotenv';

process.env.NODE_ENV = 'test';
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

export default defineConfig({
  test: {
    include: ['test/**/*.ts'],
  },
});
