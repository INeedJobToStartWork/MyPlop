import * as prompter from "@clack/prompts";
import chalk from "chalk";
import { resolve } from "path";
import { copyFiles, existFilePrompt } from "@/function";
// import { spawnSync } from "child_process";

const installerAction = () => ({
	ConfirmProcess: async () => {
		prompter.note(`Initialize app at: \n'${chalk.blue(process.env.CONFIGPATH)}'`, chalk.bgGreen(" ACTIONS "));
		const continueAction = await prompter.confirm({ message: "Do you want to continue?" });
		if (prompter.isCancel(continueAction) || !continueAction) {
			prompter.cancel("Canceled.");
			process.exit(0);
		}
	},
	// ConfirmProcess: await (async () => {
	// 	prompter.note(`Initialize app at: \n'${chalk.blue(process.env.CONFIGPATH)}'`, chalk.bgGreen(" ACTIONS "));
	// 	const continueAction = await prompter.confirm({ message: "Do you want to continue?" });
	// 	if (prompter.isCancel(continueAction) || !continueAction) {
	// 		prompter.cancel("Canceled.");
	// 		process.exit(0);
	// 	}
	// })(),
	Installation: async () => {
		const destination = process.env.CONFIGPATH;
		const templatePath = resolve(process.env.PACKAGEPATH, `./templates/app`);

		const InstallingProcess = prompter.spinner();
		InstallingProcess.start("App is installing...");
		await existFilePrompt(destination);
		copyFiles(templatePath, destination, true).catch(err => {
			InstallingProcess.stop(`❌ error \n${err}`, 1);
			// throw new Error(`${chalk.bgRed(" ERROR ")} Something went wrong induring coping files.\n${err}`);
		});
		InstallingProcess.stop("✅", 0);
	}
});

const configAction = async () => {
	const generateCurrently = () => {
		copyFiles(resolve(process.env.PACKAGEPATH, `./templates/config/global`), process.env.USERPATH, true).catch(err => {
			throw err;
		});
	};
	const generateNewRepo = () => {
		// spawnSync("git", ["init"], { cwd: process.env.USERPATH });
	};

	prompter.note(`Global config it's place where you gonna import/export your config.`, "General CONFIG");

	const generateType = await prompter.select({
		message: "Where do you want to generate it?",
		options: [
			{ label: "New Repo", value: "newRepo" },
			{ label: "Currently exist repo", value: "currently" }
		]
	});

	if (generateType == "currently") generateCurrently();
	generateNewRepo();
};

prompter
	.group(
		{
			intro: () => {
				prompter.intro(chalk.bgCyan(" App "));
			},
			typeOfAction: async () =>
				prompter.select({
					message: "Select action	",
					initialValue: "app",
					options: [
						{ label: "Installation", value: "installation", hint: "required to work properly" },
						{ label: "General Config", value: "generalConfig", hint: "Uses github repo to store data" }
					]
				}),
			generation: async ({ results }) => {
				if (results.typeOfAction === "installation") await installerAction();
				await configAction();
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
