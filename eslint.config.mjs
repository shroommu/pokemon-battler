import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([globalIgnores([
    "**/package.json",
    "**/jest.config.js",
    "**/coverage/**",
    "**/.next/**",
    "**/build/**",
]), {
    extends: [...nextCoreWebVitals],
}, {
    files: ["**/__tests__/**/*.{js,jsx}", "**/*.test.{js,jsx}"],
    rules: {
      "react/display-name": "off",
      "@next/next/no-img-element": "off",
      "jsx-a11y/alt-text": "off",
    },
}]);
