import { expect, test } from "@playwright/test";

test("home page has expected h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
});

test("visits the app root url", async ({ page }) => {
  await page.goto("http://localhost:4173");

  const title = page.locator("h1");
  await expect(title).toHaveText("Eliza with Svelte");

  const prompt = page.locator("p.resp-text").first();
  await expect(prompt).toHaveText("What is your name?");

  const statementInput = page.locator("#statement-input");
  await statementInput.fill("Steve");

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

  await page.goto("http://localhost:4173/universal-ssr");

  const title = page.locator("h1");
  await expect(title).toHaveText("Eliza with Svelte");

  const subTitle = page.locator("h3");
  await expect(subTitle).toHaveText("Universal SSR Rendered Data");

  const data = page.locator(".pre-container pre");
  const total = await data.count();

  // Verify we show the expected 3 data items rendered via universal SSR
  expect(total).toEqual(3);
  await expect(data.first()).toHaveText("largeNumber: 123 (bigint)");
  await expect(data.nth(1)).toHaveText("double: Infinity (number)");
  await expect(data.nth(2)).toHaveText("bytes: 0,1,2 (Uint8Array)");
});

test("/server-only-ssr", async ({ page }) => {
  await page.route("https://demo.connectrpc.com/**", async (route) => {
    // Prove that all API requests happen server side
    await route.abort("accessdenied");
  });

  await page.goto("http://localhost:4173/server-only-ssr");

  const title = page.locator("h1");
  await expect(title).toHaveText("Eliza with Svelte");

  const subTitle = page.locator("h3");
  await expect(subTitle).toHaveText("Server (only) Rendered Data");

  const data = page.locator(".pre-container pre");
  const total = await data.count();

  // Verify we show the expected 3 data items rendered via universal SSR
  expect(total).toEqual(3);
  await expect(data.first()).toHaveText("largeNumber: 123 (bigint)");
  await expect(data.nth(1)).toHaveText("double: Infinity (number)");
  await expect(data.nth(2)).toHaveText("bytes: 0,1,2 (Uint8Array)");
});
