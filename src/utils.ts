export const partition = <T extends any = any>(
  arr: T[],
  fn: (item: T) => boolean
): [T[], T[]] => {
  const [pass, fail] = [[], []] as [T[], T[]];
  arr.forEach((item) => (fn(item) ? pass.push(item) : fail.push(item)));
  return [pass, fail];
};
