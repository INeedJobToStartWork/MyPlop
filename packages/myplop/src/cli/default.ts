import { program } from "commander";
import * as prompter from "@clack/prompts";
import chalk from "chalk";
import { config, scanDir } from "@/function";
import { join } from "path";
import { existsSync, readdirSync } from "fs";
import { spawn } from "node:child_process";
import logging from "@/utils/logging";

program.option("-D, --DEBUG", "output extra debugging", false).action(({ DEBUG }) => {
	process.env.DEBUG = `${DEBUG}`.toUpperCase();
	const [state] = config();

	prompter
		.group(
			{
				intro: () => {
					prompter.intro(chalk.bgCyan(" MyPlop "));
				},
				readFiles: async () => {
					if (state.config === void 0) {
						prompter.cancel("You need to select config first.");
						process.exit(1);
					}
					if (state.profile === void 0) {
						prompter.cancel("You need to select profile first.");
						process.exit(1);
					}

					let path = join(process.env.CONFIGPATH, "config", state.config, "profiles", state.profile);

					async function readDir(path: string): Promise<string> {
						logging.debug(path);
						const dirContent = readdirSync(path, { withFileTypes: true });
						logging.debug(dirContent);

						if (dirContent.length === 0) {
							prompter.cancel("Not found any Script");
							process.exit(1);
						}

						const plopfilePath = join(path, "plopfile.js");
						if (existsSync(plopfilePath)) return plopfilePath;

						const options = dirContent.map(element => {
							const isDir = existsSync(join(path, element.name, "plopfile.js"));
							return {
								label: element.name,
								value: element.name,
								hint: isDir ? "Script" : "Directory"
							};
						});

						const choice = await prompter.select({
							message: "Dir Content:",
							options: options
						});

						return readDir(join(path, choice));
					}
					return readDir(path);
				},
				execute: ({ results }) => {
					logging.debug(results.readFiles);
					if (results.readFiles) spawn(`pnpm plop --cwd "${results.readFiles}" --dest "./"`, { shell: true, stdio: "inherit" });
					else {
						prompter.cancel("Not found any Script");
						process.exit(1);
					}
				}
			},

			{
				onCancel: () => {
					console.log(chalk.bgRed("Canceled"));
					process.exit(0);
				}
			}
		)
		.catch(e => {
			throw e;
		});
});
