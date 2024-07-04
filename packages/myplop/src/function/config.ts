// const configOperations = () => {
// 	const read = () => {};
// 	const write = () => {};

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { z } from "zod";

export const configScheme = z.object({
	config: z.string().or(z.undefined()),
	profile: z.string().or(z.undefined())
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
