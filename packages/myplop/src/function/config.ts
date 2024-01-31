// const configOperations = () => {
// 	const read = () => {};
// 	const write = () => {};

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { z } from "zod";
// let readConfig = ;
// readConfig.current.config = results.selectedConfig;
// writeFileSync(join(process.env.CONFIGPATH, "settings.json"), JSON.stringify(readConfig));
// 	return [read, write];
// };
// Copilot write here function which will read and edit config file.

export const configScheme = z.object({
	config: z.string().or(z.null()),
	profile: z.string().or(z.null()),
	category: z.string().or(z.null())
});

export const config = () => {
	const settingsPath = join(process.env.CONFIGPATH, "settings.json");
	const state = (() =>
		configScheme.parse(JSON.parse(readFileSync(join(process.env.CONFIGPATH, "settings.json")).toString())))();
	// function setState(callbackFunction: any): void {
	function setState(
		callbackFunction: (currentState: z.infer<typeof configScheme>) => z.infer<typeof configScheme>
	): void {
		const currentState = state;
		const newState = configScheme.parse(callbackFunction(currentState));
		writeFileSync(settingsPath, JSON.stringify(newState));
	}

	return [state, setState] as const;
};
