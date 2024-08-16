export function partition<T, S extends T>(
  list: readonly T[],
  fn: (a: T) => a is S
): [S[], Exclude<T, S>[]];
export function partition<T, S extends T>(
  list: readonly T[],
  fn: (a: T) => boolean
): [T[], T[]];
export function partition<T, S extends T>(
  list: readonly T[],
  fn: ((a: T) => a is S) | ((a: T) => boolean)
): [T[], T[]];
export function partition<T, S extends T>(
  list: readonly T[],
  fn: ((a: T) => a is S) | ((a: T) => boolean)
) {
  const [pass, fail]: [any[], any[]] = [[], []];
  list.forEach((item) => (fn(item) ? pass.push(item) : fail.push(item)));

  return list.reduce<[unknown[], unknown[]]>(
    ([left, right], item) => {
      if (fn(item)) {
        return [[...left, item], right];
      } else {
        return [left, [...right, item]];
      }
    },
    [[], []]
  );
}

export const camel2Dash = (str: string) =>
  str
    .replace(/([A-Z]|[0-9]+)/g, (match) => "-" + match.toLowerCase())
    .replace(/^-/, "");

export const generateUnknownIconError = (name: string) =>
  `lucide icon ${name} was not a known icon. Please file a bug if it's my fault https://github.com/WanQuanXie/babel-plugin-lucide-react-native/issues`;
