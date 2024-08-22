import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { LUCIDE_REACT_NATIVE } from "./const";
import { camel2Dash, generateUnknownIconError } from "./utils";

const appRealDirectory = fs.realpathSync(process.cwd());

const iconFileSubRelativePath = `${LUCIDE_REACT_NATIVE}/dist`;
const iconFileRelativePath = `node_modules/${iconFileSubRelativePath}`;

const lucideIconsRealPath = path.resolve(
  appRealDirectory,
  iconFileRelativePath
);

export const resolveModule = (useES: boolean, name: string) => {
  const iconFileName = camel2Dash(name);
  const moduleDir = useES ? "esm" : "cjs";

  const icons = fs
    .readdirSync(path.join(lucideIconsRealPath, `${moduleDir}/icons`))
    .filter((n) => path.extname(n) === ".js")
    .map((n) => path.basename(n, ".js"));

  if (icons.includes(iconFileName)) {
    return `${iconFileSubRelativePath}/${moduleDir}/icons/${iconFileName}`;
  }

  throw new Error(generateUnknownIconError(name));
};
