import { program } from "commander";
import * as prompter from "@clack/prompts";
import chalk from "chalk";
import logging from "@/utils/logging";
import { join } from "path";
import { config } from "@/function/config";
import { scanDir } from "@/function";

program
	.command("category")
	.description("Select category")
	.option("-D, --DEBUG", "DEBUG MODE")
	.action(({ DEBUG }) => {
		process.env.DEBUG = DEBUG ? "TRUE" : "FALSE";

		const [state, setState] = config();
		prompter
			.group({
				intro: () => {
					prompter.intro(chalk.bgCyan(" Select Category "));
				},
				currentlyChecked: () => {
					prompter.note(`Currently selected Category:\n${state.category}`, chalk.bgBlue(" Info "));
				},
				selectedCategory: async () => {
					if (state.config === null) {
						prompter.cancel("You need to select config first.");
						process.exit(1);
					}
					if (state.profile === null) {
						prompter.cancel("You need to select profile first.");
						process.exit(1);
					}
					logging.debug("Category path: ", process.env.CONFIGPATH);

					const pathToScan = join(process.env.CONFIGPATH, "config", state.config, "profiles", state.profile);
					const Categorys = scanDir(pathToScan, "category");

					logging.debug("Found Categorys:", Categorys);
					const selected = await prompter.select({
						message: "Select Category",
						initialValue: state.category,
						options: Categorys.map(({ name }) => ({ label: name, value: name }))
					});

					logging.debug("Selected Category: ", selected);
					if (prompter.isCancel(selected) || !selected) {
						prompter.cancel("Canceled!");
						process.exit(0);
					}
					return selected;
				},
				selecting: ({ results }) => {
					if (results.selectedCategory === state.category) return void 0;
					setState(e => ({ ...e, category: results.selectedCategory! }));
					logging.debug("Category state: ", state);
				},
				outro: () => {
					prompter.outro(chalk.bgGreen(" Category Selected! "));
				}
			})
			.catch(e => {
				logging.error(e);
				process.exit(1);
			});
	});
