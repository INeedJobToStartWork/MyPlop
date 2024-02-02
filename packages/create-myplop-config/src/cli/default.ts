// import { packageManager } from "@/functions";
import { program } from "commander";

// const argTest = new Argument("<path>", "path to create the config in.");

program
	.option("-d, --debug", "output extra debugging", false)
	// .addArgument(argTest)
	// .option("--y --yestoall", "package manager to use (npm, yarn, pnpm)", false)
	// .option("--manager <manager>", "package manager to use (npm, yarn, pnpm)", "npm")
	.action(async (opts: { debug: boolean; yestoall: boolean }) => {
		console.log("Hello world!");
		console.log("Options: ", opts);
	});
