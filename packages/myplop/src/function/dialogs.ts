import * as prompter from "@clack/prompts";
import chalk from "chalk";
import { existsSync } from "fs";

export const existFilePrompt = async (destination: string): Promise<void> => {
	if (existsSync(destination)) {
		console.log(chalk.bgBlue("Files already exists."));
		const overwrite = await prompter.confirm({
			message: "Overwrite Folders/Files?",
			initialValue: false
		});
		if (prompter.isCancel(overwrite) || !overwrite) {
			prompter.cancel("Dont overwrite file.");
			process.exit(0);
		}
	}
};
