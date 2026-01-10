const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    js.configs.recommended,

    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
        },

        rules: {
            // add custom rules here if you want
        },
    },
];
