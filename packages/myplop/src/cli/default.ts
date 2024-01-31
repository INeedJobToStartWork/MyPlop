import { program } from "commander";
import * as prompter from "@clack/prompts";
import chalk from "chalk";
import { config } from "@/function";

program.action(() => {
	const [state] = config();

	prompter
		.group(
			{
				intro: () => {
					prompter.intro(chalk.bgCyan(" MyPlop "));
				},
				selectAction: () => {
					if (state.config === null) {
						prompter.cancel("You need to select config first.");
						process.exit(1);
					}
					if (state.profile === null) {
						prompter.cancel("You need to select profile first.");
						process.exit(1);
					}
					if (state.category === null) {
						prompter.cancel("You need to select category first.");
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
