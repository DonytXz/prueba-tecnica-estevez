import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // TODO: Add Vitest TestBed setup (e.g. `test/setup-vitest.ts`) and adapt app specs
    // to override external templates/styles so TestBed-based specs can run. Remove
    // this include filter once TestBed is supported.
    // Limit to unit tests under core and features to avoid Angular TestBed-heavy app specs
    include: ['src/app/core/**/*.spec.ts', 'src/app/features/**/*.spec.ts'],
    coverage: {
      provider: 'v8'
    }
  }
});
