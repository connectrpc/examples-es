import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import ResolveTypeScriptPlugin from "resolve-typescript-plugin";

// Note that vue scaffolds a cypress config with a .ts extension, but this doesn't
// work with ESM modules. Renaming this file to have a .js extension fixes the issue.
// See: https://github.com/cypress-io/cypress/issues/23552

const options = {
  webpackOptions: {
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [new ResolveTypeScriptPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: { transpileOnly: true },
        },
      ],
    },
  },
};

export default defineConfig({
  e2e: {
    supportFile: false,
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173",
    setupNodeEvents(on) {
      on("file:preprocessor", webpackPreprocessor(options));
    },
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
