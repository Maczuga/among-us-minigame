
module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
  },
  "parserOptions": {
    "ecmaFeatures": {
      jsx: true
    },
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": [
    "import",
    "json",
    "unused-imports"
  ],
  "rules": {
    "semi": "error",
    "quotes": [
      "warn",
      "double",
      {
        "avoidEscape": true
      }
    ],
    "indent": ["error", 2, {"SwitchCase": 1}],
    "no-multiple-empty-lines": ["warn", {"max": 1, "maxEOF": 1}],
    "eqeqeq": "error",
    "no-trailing-spaces": "warn",
    "no-throw-literal": "error",
    "func-style": "error",
    "no-alert": "error",
    "no-eval": "error",
    "no-shadow": "off",
    "no-undef": "error",
    "no-underscore-dangle": "off",
    "no-unused-expressions": [
      "error",
      {
        "allowTaggedTemplates": true
      }
    ],
    "unused-imports/no-unused-imports-ts": "error",
    "unused-imports/no-unused-vars-ts": "off",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "object-curly-spacing": [
      "error",
      "never"
    ],
    "spaced-comment": [
      "error",
      "always",
      {
        "block": {
          "balanced": true
        }
      }
    ],
    "json/*": [
      "error",
      {
        "allowComments": true
      }
    ],
    "import/named": "off",
    "import/no-unresolved": "off",
    "import/order": "error",
  },
  "overrides": [
    {
      "files": [
        "*.d.ts"
      ],
      "rules": {
        "spaced-comment": "off"
      }
    }
  ],
  "ignorePatterns": [
    "**/*.*",
    "!*.js",
    "!*.jsx",
    "**/dist",
    "**/node_modules"
  ]
};

