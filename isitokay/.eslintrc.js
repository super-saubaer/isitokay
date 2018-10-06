module.exports = {
    "extends": "google",
    "env": {
        "node": true
    },
   "parserOptions": {
        "ecmaVersion": 6
    },
    "globals": {
        "document": true,
        "chai": true,
        "describe": true,
        "it": true,
        "window": true
    },
    "rules": {
        "indent": [2, 2],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        // disable
        "no-tabs": "off",
        "indent": "off",
        "space-before-function-paren": "off",
        "max-len": "off",
    }
};