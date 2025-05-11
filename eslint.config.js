import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
    { ignores: ["coverage/", "node_modules/"] },
    { plugins: { js }, extends: ["js/recommended"] },
]);
