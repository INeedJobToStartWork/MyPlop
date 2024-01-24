import { readFileSync, readdirSync, statSync } from "fs";
import yaml from "js-yaml";
import path, { join, resolve } from "path";

const AllWorkspaceNames = async () => {
  const parsedWorkspaces = await yaml.load(
    readFileSync("./pnpm-workspace.yaml", "utf8")
  );
  const result = await Promise.all(
    parsedWorkspaces.packages.map(async (workspace) => {
      const path = join(process.cwd(), workspace).replace("*", "");

      const dirPackageJson = readdirSync(path)
        .filter((file) => {
          const filePath = join(path, file);
          return (
            statSync(filePath).isDirectory() &&
            readdirSync(filePath).includes("package.json")
          );
        })
        .map((directory) => join(path, directory, "package.json"));

      const WorkspacesName = await Promise.all(
        dirPackageJson.map(async (packageJson) => {
          const res = await import(`file://${packageJson}`, {
            assert: { type: "json" },
          });
          return res.default.name;
        })
      );

      return WorkspacesName;
    })
  );
  return result.flat(Infinity);
};

const prompts = async () => {
  const result = (await AllWorkspaceNames()).map(
    (workspace) => `pnpm pre --filter ${workspace} --`
  );
  return result;
};

// export default {
//   "*": ["pnpm turbo test"],
// };
export default {
  "*": [...(await prompts())],
};
// export default {
//   "./config/eslintrc": "pnpm pre --filter eslintrc",
// };
