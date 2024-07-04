#!/usr/bin/env node
import { checkSystem, configPath } from "@/function";
import "@/cli";
import chalk from "chalk";
import { program } from "commander";

import path from "path";
import { fileURLToPath } from "url";
import logging from "./utils/logging";

process.env.OS = checkSystem;
process.env.USERPATH = process.cwd();
process.env.PACKAGEPATH = path.dirname(fileURLToPath(import.meta.url));
process.env.CONFIGPATH = configPath();

if (process.env.OS != "windows") {
	logging.log(chalk.bgRed(" ERROR "), "Currently Version support only Windows - Sorry");
	process.exit(1);
}

declare global {
	module NodeJS {
		export interface ProcessEnv extends Record<string, unknown> {
			OS: typeof checkSystem;
			PACKAGEPATH: string;
			CONFIGPATH: string;
			USERPATH: string;
		}
	}
}

program.parse(process.argv);
