import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'test',
  webServer: {
    command: 'yarn dev',
    port: 3000,
    timeout: 500 * 1000,
    reuseExistingServer: !process.env.CI
  },
  use: { baseURL: 'http://localhost:3000' }
}

export default config
