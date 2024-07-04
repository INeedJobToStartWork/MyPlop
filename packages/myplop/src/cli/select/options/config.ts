import { program } from "commander";
import * as prompter from "@clack/prompts";
import chalk from "chalk";
import logging from "@/utils/logging";
import { join } from "path";
import { config } from "@/function/config";
import { scanDir } from "@/function";

const [state, setState] = config();
prompter
	.group({
		intro: () => {
			prompter.intro(chalk.bgCyan(" Select config "));
		},
		currentlyChecked: () => {
			prompter.note(`Currently selected config:\n${state.config}`, chalk.bgBlue(" Info "));
		},
		selectedConfig: async () => {
			logging.debug("Config path: ", process.env.CONFIGPATH);
			const pathToScan = join(process.env.CONFIGPATH, "./config");
			const configs = scanDir(pathToScan, "config");
			logging.debug("Found Configs:", configs);
			const selected = await prompter.select({
				message: "Select config",
				initialValue: state.config,
				options: configs.map(({ name }) => ({ label: name, value: name }))
			});
			logging.debug("Selected config: ", selected);
			return selected;
		},
		selecting: ({ results }) => {
			if (results.selectedConfig === state.config) return;
			setState(e => ({ ...e, config: results.selectedConfig!, profile: void 0 }));
			logging.debug("Config state: ", state);
		},
		outro: () => {
			prompter.outro(chalk.bgGreen(" Config Selected! "));
		}
	})
	.catch(e => {
		throw e;
	});
