import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', timeout: 60000, workers: 1,
  use: { baseURL: 'http://127.0.0.1:8081', viewport: { width: 390, height: 844 }, launchOptions: { channel: 'chrome' } },
  webServer: { command: 'node scripts/serve-preview.mjs dist-local', url: 'http://127.0.0.1:8081', reuseExistingServer: true },
});
