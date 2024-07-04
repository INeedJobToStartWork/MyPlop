import { program } from "commander";
import * as prompter from "@clack/prompts";
import chalk from "chalk";
import logging from "@/utils/logging";

program
	.command("select")
	.description("Select config properties")
	.option("-D, --DEBUG", "output extra debugging", false)
	.action(({ DEBUG }) => {
		process.env.DEBUG = `${DEBUG}`.toUpperCase();

		prompter
			.group(
				{
					intro: () => {
						prompter.intro(chalk.bgCyan(" Select "));
					},
					choice: async () =>
						prompter.select({
							message: "What do you want to select?",
							initialValue: "app",
							options: [
								{ label: "Config", value: "config.ts" },
								{ label: "Profile", value: "profile.ts" }
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
