import { expect, test } from '@playwright/test'

test('basic test', async ({ page }) => {
  await page.goto('/')
  const content = await page.content()
  await expect(content).toContain('Your Metaverse')
})
