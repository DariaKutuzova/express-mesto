module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "ignorePatterns": [".eslintrc.js"],
  "extends": "airbnb-base",
  "parserOptions": {
    "ecmaVersion": 13
  },
  "rules": {
    "no-console": "off",
    "no-underscore-dangle": [
      "error",
      {
        "allow": [
          "_id"
        ]
      }
    ],
    }
};
