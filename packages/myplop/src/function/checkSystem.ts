import { platform } from "os";

type System = "linux" | "mac" | "other" | "windows";

export const checkSystem: System = (() => {
	const system = platform();
	if (system == "win32") {
		return "windows";
	}
	if (system == "darwin") {
		return "mac";
	}
	if (system == "linux") {
		return "linux";
	}
	return "other";
})();
export default checkSystem;
