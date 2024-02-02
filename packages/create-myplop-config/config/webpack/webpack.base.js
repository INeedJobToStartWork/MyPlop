import CopyPlugin from "copy-webpack-plugin";
import { join, resolve } from "path";
import { merge } from "webpack-merge";
import WebpackConfig from "webpackrc/webpack.base.js";

const __dirname = resolve();
const PATHOUT = resolve(__dirname, "lib");

export default merge(WebpackConfig, {
	// plugins: [
	// 	new CopyPlugin({
	// 		patterns: [{ from: resolve(__dirname, "./src/templates"), to: join(PATHOUT, "templates") }]
	// 	})
	// ]
});
