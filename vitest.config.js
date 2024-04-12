import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["src/**/*.test.js"],
        coverage: { 100: true, exclude: ["index.js"] },
    },
});
