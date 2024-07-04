import * as prompter from "@clack/prompts";
import chalk from "chalk";
import { resolve } from "path";
import { copyFiles, existFilePrompt } from "@/function";

prompter
	.group(
		{
			intro: () => {
				prompter.intro(chalk.bgCyan(" App installation "));
			},
			// configFinder: async () => {},
			// userChoose: async () => {},
			outro: () => {
				prompter.outro(chalk.bgGreen(" App has been installed! "));
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
