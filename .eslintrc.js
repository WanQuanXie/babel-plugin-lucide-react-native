module.exports = {
  extends: "./node_modules/kcd-scripts/eslint.js",
  rules: {
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "*.*css",
            group: "object",
            patternOptions: { matchBase: true },
            position: "after",
          },
          {
            pattern: "@/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["type"],
        // 导入的排序顺序 内置、外部库、内部别名路径导入、父级目录、同级目录、当前目录、对象类型变量（如：import log = console.log;）、import type
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
      },
    ],
  },
};
