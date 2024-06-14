import { copy } from "esbuild-plugin-copy";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	target: "es2020",
	format: ["esm"],
	clean: true,
	splitting: false,
	esbuildPlugins: [
		copy({
			assets: [
				{ from: "./src/templates/configs/*", to: "./templates/configs" }
				// { from: "./package.json", to: "./package.json" }
			]
		})
	]
});
