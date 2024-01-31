import { checkSystem, configPath } from "@/function";
import "@/cli";
import chalk from "chalk";
import { program } from "commander";

process.env.OS = checkSystem();
process.env.USERPATH = process.cwd();
process.env.PACKAGEPATH = __dirname;
process.env.CONFIGPATH = configPath();

const userSystem = process.env.OS;
if (userSystem != "windows") {
	console.log(chalk.bgRed(" ERROR "), "Currently Version support only Windows - Sorry");
	process.exit(1);
}

declare global {
	module NodeJS {
		// @ts-expect-error - ProcessEnv is default defined but we want to override it
		export type ProcessEnv = Record<string, unknown> & {
			OS: ReturnType<typeof checkSystem>;
			PACKAGEPATH: string;
			CONFIGPATH: string;
			USERPATH: string;
		};
	}
}

program.parse(process.argv);
