import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.ts?(x)'],
    environment: 'jsdom',
  },
});
