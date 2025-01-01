import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

/** @type { import("eslint").Linter.Config[] } */
export default [
    { ignores: ["coverage/", "node_modules/"] },

    js.configs.recommended,

    {
        plugins: { prettier: prettierPlugin },
        rules: { ...prettierConfig.rules, "prettier/prettier": "error" },
    },
];
