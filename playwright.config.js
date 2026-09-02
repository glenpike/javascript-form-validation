import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npx serve -l 3000 src',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: 'http://localhost:3000', headless: false },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});