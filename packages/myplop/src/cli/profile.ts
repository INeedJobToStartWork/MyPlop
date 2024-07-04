import { program } from "commander";
import * as prompter from "@clack/prompts";
import chalk from "chalk";
import logging from "@/utils/logging";
import { join } from "path";
import { config } from "@/function/config";
import { scanDir } from "@/function";

program
	.command("profile")
	.description("Select profile")
	.option("-D, --DEBUG", "DEBUG MODE")
	.action(({ DEBUG }) => {
		process.env.DEBUG = DEBUG ? "TRUE" : "FALSE";

		const [state, setState] = config();
		prompter
			.group({
				intro: () => {
					prompter.intro(chalk.bgCyan(" Select profile "));
				},
				currentlyChecked: () => {
					prompter.note(`Currently selected profile:\n${state.profile}`, chalk.bgBlue(" Info "));
				},
				selectedprofile: async () => {
					if (state.config === void 0) {
						prompter.cancel("You need to select config first.");
						process.exit(1);
					}
					logging.debug("profile path: ", process.env.CONFIGPATH);

					const pathToScan = join(process.env.CONFIGPATH, "config", state.config, "profiles");
					const profiles = scanDir(pathToScan, "profile");

					logging.debug("Found Profiles:", profiles);
					const selected = await prompter.select({
						message: "Select profile",
						initialValue: state.profile,
						options: profiles.map(({ name }) => ({ label: name, value: name }))
					});
					logging.debug("Selected profile: ", selected);

					return selected;
				},
				selecting: ({ results }) => {
					if (results.selectedprofile === state.profile) return void 0;
					setState(e => ({ ...e, profile: results.selectedprofile! }));
					logging.debug("Profile state: ", state);
				},
				outro: () => {
					prompter.outro(chalk.bgGreen(" Profile Selected! "));
				}
			})
			.catch(e => {
				throw e;
			});
	});
