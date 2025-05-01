import { globalIgnores } from "eslint/config";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pluginCypress from "eslint-plugin-cypress/flat";
import pluginChaiFriendly from "eslint-plugin-chai-friendly";

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  globalIgnores([
    "**/dist/**",
    "**/dist-ssr/**",
    "**/coverage/**",
    "cypress/support/",
  ]),

  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,

  {
    ...pluginCypress.configs.recommended,
    ...pluginChaiFriendly.configs.recommendedFlat,
    files: [
      "**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}",
      "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
      "cypress/support/**/*.{js,ts,jsx,tsx}",
    ],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off", // disable original rule
      "chai-friendly/no-unused-expressions": "error",
    },
  },
);
