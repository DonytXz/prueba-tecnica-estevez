import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup-vitest.ts'],
    include: ['src/app/core/**/*.spec.ts', 'src/app/features/**/*.spec.ts'],
    coverage: {
      provider: 'v8'
    }
  }
});
