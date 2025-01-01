import js from "@eslint/js";

/** @type { import("eslint").Linter.Config[] } */
export default [{ ignores: ["coverage/", "node_modules/"] }, js.configs.recommended];
