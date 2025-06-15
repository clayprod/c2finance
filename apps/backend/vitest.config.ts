import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });
process.env.NODE_ENV = 'test';

export default defineConfig({
  test: {
    include: ['test/**/*.ts'],
  },
});
