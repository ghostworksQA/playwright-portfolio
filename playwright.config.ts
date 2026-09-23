import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração do projeto. Ver https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://www.saucedemo.com',
    // O saucedemo marca os elementos com data-test, e não com o data-testid que o Playwright usa por omissão
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
  },

  // Localmente (macOS 13) o Chromium do Playwright não está disponível, por isso usa-se o Google Chrome instalado.
  // No CI (GitHub Actions, Linux) usa-se o Chromium do Playwright.
  projects: process.env.CI
    ? [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
    : [{ name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } }],
});
