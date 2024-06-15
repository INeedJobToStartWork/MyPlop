import logging from "@/utils/logging";
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import type { TFunctionReturn, TMyErrorList } from "oh-my-error";
import { myErrorWrapper } from "oh-my-error";
import { join } from "path";

const MyErrorList = {
	CANT_MKDIR: {
		code: "CP001",
		hint: {},
		message: { user: "Can't make dir" }
	},
	CANT_COPY_FILE: {
		code: "CP002",
		hint: {},
		message: { user: "Can't Copy File" }
	}
} as const satisfies TMyErrorList;

const copyFiles = (source: string, target: string, emptyDirs = true): TFunctionReturn<void> => {
	if (!existsSync(target)) {
		const [, isError] = myErrorWrapper(mkdirSync)(target);
		if (isError) return [MyErrorList.CANT_MKDIR, true];
	}

	const [, isError] = myErrorWrapper(() => {
		readdirSync(source, { withFileTypes: true }).forEach(file => {
			logging.debug("File info: ", file);
			const curSource = join(source, file.name);
			if (file.isDirectory()) copyFiles(curSource, join(target, file.name), emptyDirs);
			else copyFileSync(curSource, join(target, file.name));
		});
	})();
	if (isError) return [MyErrorList.CANT_COPY_FILE, true];

	// ERROR HANDLING DOKONCZ

	return [, false];
};

export { copyFiles };
