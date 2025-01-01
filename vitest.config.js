import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: { 100: true, exclude: ["index.js", "*.config.js"] },
    },
});
