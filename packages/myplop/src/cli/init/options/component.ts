import * as prompter from "@clack/prompts";
import chalk from "chalk";

prompter
	.group(
		{
			intro: () => {
				prompter.intro(chalk.bgCyan(" Initialize your Component! "));
			},
			type: async () =>
				prompter.select({
					message: "What type of component do you want to initialize?",
					initialValue: "npm",
					options: [
						{ label: "File", value: "file", hint: "Your own Code" },
						{ label: "NPM", value: "npm", hint: "As package npm" },
						{ label: "Repo", value: "repo", hint: "As package npm" }
					]
				}),
			outro: () => {
				prompter.outro(chalk.bgGreen(" Component has been Initialized! "));
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
