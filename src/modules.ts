import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { LUCIDE_REACT_NATIVE } from "./const";

const appDirectory = fs.realpathSync(process.cwd());

export const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

const lucidePath = resolveApp(`node_modules/${LUCIDE_REACT_NATIVE}/dist`);

const icons = fs
  .readdirSync(path.join(lucidePath, "esm/icons"))
  .filter((name) => path.extname(name) === ".js")
  .map((name) => path.basename(name, ".js"));

export const camel2Dash = (str: string) =>
  str
    .replace(/([A-Z]|[0-9]+)/g, (match) => "-" + match.toLowerCase())
    .replace(/^-/, "");

export const resolveModule = (useES: boolean, name: string) => {
  const iconFileName = camel2Dash(name);

  if (icons.includes(iconFileName)) {
    return `${LUCIDE_REACT_NATIVE}/dist/${useES ? "esm" : "cjs"}/icons/${iconFileName}`;
  }

  throw new Error(`lucide icon ${name} was not a known icon
    Please file a bug if it's my fault https://github.com/WanQuanXie/babel-plugin-lucide-react-native/issues
  `);
};
