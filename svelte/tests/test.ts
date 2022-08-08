import { expect, test } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const title = page.locator('h1')
    await expect(title).toHaveText('Eliza')

    const prompt = page.locator('p.resp-text').first()
    await expect(prompt).toHaveText('What is your name?')

    const statementInput = page.locator('#statement-input')
    await statementInput.type('Steve')

    const sendButton = page.locator('#send-button')
    await sendButton.click()

    const name = page.locator('p.resp-text').nth(1)
    await expect(name).toHaveText('Steve')

    const response = page.locator('p.resp-text').nth(2)
    await expect(response).toHaveText("Hi Steve. I'm Eliza.")
})
