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
			confirmAction: async () => {
				prompter.note(`Initialize app at: \n'${chalk.blue(process.env.CONFIGPATH)}'`, chalk.bgGreen(" ACTIONS "));
				const continueAction = await prompter.confirm({ message: "Do you want to continue?" });
				if (prompter.isCancel(continueAction) || !continueAction) {
					prompter.cancel("Canceled.");
					process.exit(0);
				}
			},
			createConfig: async () => {
				const destination = process.env.CONFIGPATH;
				const templatePath = resolve(process.env.PACKAGEPATH, `./templates/app`);

				const InstallingProcess = prompter.spinner();
				InstallingProcess.start("App is installing...");
				await existFilePrompt(destination);
				const [data, isError] = copyFiles(templatePath, destination, true);
				if (isError) {
					InstallingProcess.stop(`❌ Error: ${data.message?.user}`, 1);
					process.exit(1);
				}
				InstallingProcess.stop("✅", 0);
			},
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
