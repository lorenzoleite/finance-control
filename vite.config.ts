import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    environment: 'happy-dom'
  }
} as UserConfig & {
  test: InlineConfig;
});
