import EslintBase from "eslintrc/base.js";
import EslintTypescript from "eslintrc/typescript.js";

export default [{ ignores: ["prettier.config.js"] }, ...EslintBase, ...EslintTypescript];
