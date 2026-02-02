/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    
    projects: [
      {
        extends: true,
        test: {
          name: 'storybook',
          environment: 'jsdom',
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});