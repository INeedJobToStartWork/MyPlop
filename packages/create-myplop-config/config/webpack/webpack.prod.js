import { resolve } from "path";
import { merge } from "webpack-merge";
import WebpackConfigBasic from "./webpack.base.js";
import WebpackConfigProd from "webpackrc/webpack.prod.js";

const __dirname = resolve();
const PATHOUT = resolve(__dirname, "dist");

export default merge(WebpackConfigProd, WebpackConfigBasic);
