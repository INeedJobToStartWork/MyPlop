import { program } from "commander";
import * as prompter from "@clack/prompts";
import chalk from "chalk";
import { myErrorCatcher, myErrorWrapper } from "oh-my-error";
import logging from "@/utils/logging";
import { existsSync } from "fs";

program
	.command("init")
	.description("Initialize plopfile")
	.option("-D, --DEBUG", "output extra debugging", false)
	.action(({ DEBUG }) => {
		process.env.DEBUG = `${DEBUG}`.toUpperCase();
		// process.env.DEBUG = "TRUE";

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
								{ label: "App", value: "app.ts", hint: "Initialize app - required to work app" },
								{ label: "Config", value: "config.ts" },
								{ label: "Profile", value: "profile.ts", hint: "Initialize profile at config" },
								{ label: "Component", value: "component.ts", hint: "Initialize component" }
							]
						}),
					loadModule: async ({ results }) => {
						try {
							await import(`./options/${results.choice}`);
						} catch (err) {
							logging.error("Module not found - probably file with option doesnt exist.", err);
							process.exit(1);
						}
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
