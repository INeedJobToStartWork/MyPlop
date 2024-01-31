import { merge } from "webpack-merge";
import WebpackConfigDev from "webpackrc/webpack.dev.js";
import WebpackConfigBasic from "./webpack.base.js";

export default merge(WebpackConfigDev, WebpackConfigBasic, {});
