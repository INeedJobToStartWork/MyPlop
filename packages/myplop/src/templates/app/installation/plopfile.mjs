import fs from "fs";
import settings from "./settings.json" assert { type: "json" };

export default async function (plop) {
	const [config, profile] = [settings.current.config, settings.current.profile];

	const pathPlopFile = join(process.env.CONFIGPATH, config, profile, "generate");

	const components = fs.readDirSync(process.env.CONFIGPATH);

	return plop.load(pathPlopFile);
}
