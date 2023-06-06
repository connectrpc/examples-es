import type { PlaywrightTestConfig } from "@playwright/test";

// Playwright Config
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  testMatch: "*.spec.ts",
  webServer: {
    command: "npm run build && npm run preview",
    port: 3000,
  },
};

export default config;
