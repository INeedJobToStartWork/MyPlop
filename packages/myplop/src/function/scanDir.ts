import { existsSync, readdirSync } from "fs";
import { cancel } from "@clack/prompts";
export const scanDir = (path: string, name: string) => {
	if (!existsSync(path)) {
		cancel(`Not found any ${name} in this repo.`);
		process.exit(1);
	}
	const dirContent = readdirSync(path, {
		withFileTypes: true
	});
	if (dirContent.length === 0) {
		cancel(`Not found any ${name} in this repo.`);
		process.exit(0);
	}
	const elementsFound = dirContent.filter(element => element.isDirectory()).map(({ name, path }) => ({ name, path }));
	return elementsFound;
};
