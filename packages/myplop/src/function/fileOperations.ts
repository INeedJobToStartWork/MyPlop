import logging from "@/utils/logging";
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

const copyFiles = async (source: string, target: string, emptyDirs = true): Promise<void> =>
	new Promise(() => {
		if (!existsSync(target)) mkdirSync(target);
		readdirSync(source, { withFileTypes: true }).forEach(file => {
			logging.debug("File info: ", file);
			const curSource = join(source, file.name);
			if (file.isDirectory()) copyFiles(curSource, join(target, file.name), emptyDirs);
			else copyFileSync(curSource, join(target, file.name));
		});
	});

export { copyFiles };
