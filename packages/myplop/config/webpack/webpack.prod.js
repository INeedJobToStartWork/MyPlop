import { merge } from "webpack-merge";
import WebpackConfigProd from "webpackrc/webpack.prod.js";

export default merge(WebpackConfigProd, {});
