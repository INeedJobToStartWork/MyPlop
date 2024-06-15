import { checkSystem } from ".";
import { join } from "path";

export const configPath = () => {
	const userSystem = checkSystem;
	if (userSystem == "windows") {
		return join(process.env.APPDATA, "MyPlop");
	}
	if (userSystem == "linux") {
		// ADD SUPPORT
	} else if (userSystem == "mac") {
		// ADD SUPPORT
	}
	// throw new Error("System not supported");
	return join(process.env.APPDATA, "MyPlop");
};
export default configPath;
