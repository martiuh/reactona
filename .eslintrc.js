module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
      generators: true,
      experimentalObjectRestSpread: true
    },
    sourceType: "module",
    allowImportExportEverywhere: false
  },
  extends: ["plugin:react/recommended", "airbnb"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".json", ".css", ".scss", ".sass"]
      }
    }
  },
  globals: {
    window: true,
    document: true,
    __dirname: true,
    __DEV__: true,
    CONFIG: true,
    process: true,
    jest: true,
    describe: true,
    test: true,
    it: true,
    expect: true,
    beforeEach: true,
    fetch: true,
    alert: true,
    navigator: true,
    URL: true,
    FileReader: true,
    Image: true,
    SW_TESTING: true,
    IS_SERVER: true
  },
  rules: {
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        jsx: "never",
        scss: "never",
        css: "never",
        sass: "never"
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        exceptions: { noHref: true, invalidHref: true },
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["preferButton"]
      }
    ],
    "jsx-a11y/label-has-for": [
      2,
      {
        required: {
          some: ["nesting", "id"]
        },
        allowChildren: false
      }
    ],
    "no-shadow": 0,
    "no-use-before-define": 0,
    "no-param-reassign": 0,
    "react/prop-types": 0,
    "react/no-render-return-value": 0,
    "no-confusing-arrow": 0,
    "no-underscore-dangle": 0,
    "no-plusplus": 0,
    camelcase: 0,
    "prefer-template": 1,
    "react/no-array-index-key": 1,
    "global-require": 1,
    "react/jsx-indent": 1,
    "dot-notation": 1,
    "import/no-named-default": 1,
    "no-unused-vars": 1,
    "consistent-return": 1,
    "import/prefer-default-export": 1,
    "no-console": 1,
    "jsx-a11y/no-static-element-interactions": 1,
    "no-case-declarations": 1,
    "jsx-quotes": [2, "prefer-single"],
    "react/jsx-filename-extension": [2, { extensions: [".jsx", ".js"] }],
    "spaced-comment": [2, "always", { markers: ["?"] }],
    "arrow-parens": [2, "as-needed", { requireForBlockBody: false }],
    "brace-style": [2, "stroustrup"],
    "import/no-unresolved": [2, { commonjs: true, caseSensitive: true }],
    "no-unused-expressions": [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true
      }
    ],
    "comma-dangle": [
      2,
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never"
      }
    ],
    "max-len": [
      "error",
      {
        code: 100,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    "react/sort-comp": [
      2,
      {
        order: [
          "propTypes",
          "props",
          "state",
          "defaultProps",
          "contextTypes",
          "childContextTypes",
          "getChildContext",
          "static-methods",
          "lifecycle",
          "everything-else",
          "render"
        ]
      }
    ],
    "jsx-quotes": 0,
    "linebreak-style": 0
  }
};
