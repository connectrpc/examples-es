import { expect, test } from "@playwright/test";

test("visits the app root url", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const title = page.locator("h1");
  await expect(title).toHaveText("Eliza with Svelte");

  const prompt = page.locator("p.resp-text").first();
  await expect(prompt).toHaveText("What is your name?");

  const statementInput = page.locator("#statement-input");
  await statementInput.type("Steve");

  const sendButton = page.locator("#send-button");
  await sendButton.click();

  const name = page.locator("p.resp-text").nth(1);
  await expect(name).toHaveText("Steve");

  const response = page.locator("p.resp-text").nth(2);
  await expect(response).toHaveText("Hi Steve. I'm Eliza.");
});

test("/universal-ssr", async ({ page }) => {
  await page.route("https://demo.connectrpc.com/**", async (route) => {
    // Prove that all API requests happen server side
    await route.abort("accessdenied");
  });

  await page.goto("http://localhost:3000/universal-ssr");

  const title = page.locator("h1");
  await expect(title).toHaveText("Eliza with Svelte");

  const request = page.getByTestId("data-request");
  await expect(request).toHaveText(/.*hi from the server.*/);

  const response = page.getByTestId("data-response");
  await expect(response).toHaveText(/.+/);

  const largeNum = page.getByTestId("data-largeNum");
  await expect(largeNum).toHaveText("123");
});

test("/server-only-ssr", async ({ page }) => {
  await page.route("https://demo.connectrpc.com/**", async (route) => {
    // Prove that all API requests happen server side
    await route.abort("accessdenied");
  });

  await page.goto("http://localhost:3000/server-only-ssr");

  const title = page.locator("h1");
  await expect(title).toHaveText("Eliza with Svelte");

  const request = page.getByTestId("data-request");
  await expect(request).toHaveText(/.*hi from the server.*/);

  const response = page.getByTestId("data-response");
  await expect(response).toHaveText(/.+/);

  const largeNum = page.getByTestId("data-largeNum");
  await expect(largeNum).toHaveText("123");
});
