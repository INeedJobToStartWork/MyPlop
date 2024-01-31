import { program } from "commander";
import * as prompter from "@clack/prompts";
import chalk from "chalk";

program
	.command("init")
	.description("Initialize plopfile")
	.option("-D, --DEBUG", "output extra debugging (default: false)", false)
	.action(({ DEBUG }) => {
		process.env.DEBUG = `${DEBUG}`.toUpperCase();

		prompter
			.group(
				{
					intro: () => {
						prompter.intro(chalk.bgCyan(" Initializer "));
					},
					choice: async () =>
						prompter.select({
							message: "What do you want to initialize?",
							initialValue: "app",
							options: [
								{ label: "App", value: "app", hint: "Initialize app - required to work app" },
								{ label: "Config", value: "config" },
								{ label: "Profile", value: "profile", hint: "Initialize profile at config" },
								{ label: "Component", value: "component", hint: "Initialize component" }
							]
						}),
					outro: () => {
						prompter.outro(chalk.bgGreen("Choosed correctly!"));
					},
					loadModule: async ({ results }) => {
						await import(/* webpackMode: "eager" */ `./options/${results.choice}`).catch(err => {
							console.error("Module not found - probably file with option doesnt exist.", err);
							process.exit(0);
						});
					}
				},
				{
					onCancel: () => {
						console.log(chalk.red("Canceled."));
						process.exit(0);
					}
				}
			)
			.catch(e => {
				throw e;
			});
	});
