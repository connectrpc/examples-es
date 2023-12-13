import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.ts"],
    deps: {
      // This hot-fixes the issue. But it shouldn't be necessary.
      // inline: ['@connectrpc/connect']
    }
  }
})
