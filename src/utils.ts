export const partition = <T extends any = any>(
  arr: T[],
  fn: (item: T) => boolean
): [T[], T[]] => {
  const [pass, fail] = [[], []] as [T[], T[]];
  arr.forEach((item) => (fn(item) ? pass.push(item) : fail.push(item)));
  return [pass, fail];
};

export const camel2Dash = (str: string) =>
  str
    .replace(/([A-Z]|[0-9]+)/g, (match) => "-" + match.toLowerCase())
    .replace(/^-/, "");
