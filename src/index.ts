import type babelCore from "@babel/core";

type Core = typeof babelCore;

const LUCIDE_REACT_NATIVE = "lucide-react-native";

const partition = <T extends any = any>(
  arr: T[],
  fn: (item: T) => boolean
): [T[], T[]] => {
  const [pass, fail] = [[], []] as [T[], T[]];
  arr.forEach((item) => (fn(item) ? pass.push(item) : fail.push(item)));
  return [pass, fail];
};

interface Config {
  opts: {};
}

export default function lucideReactNativeImport({
  types: t,
}: Core): babelCore.PluginObj<Config> {
  return {
    name: LUCIDE_REACT_NATIVE,
    visitor: {
      ImportDeclaration(path) {
        const nodeSourceValue = path.node.source.value;
        const nodeSpecifiers = path.node.specifiers;

        const [nodeDefaultSpecifiers, nodeNamedSpecifiers] = partition(
          nodeSpecifiers,
          (specifier) => t.isImportDefaultSpecifier(specifier)
        );

        if (
          nodeSourceValue.startsWith(LUCIDE_REACT_NATIVE) &&
          nodeNamedSpecifiers.length !== 0
        ) {
          path.replaceWithMultiple([
            ...nodeDefaultSpecifiers.map((specifier) =>
              t.importDeclaration([specifier], t.stringLiteral(nodeSourceValue))
            ),
            ...nodeNamedSpecifiers.map((specifier) =>
              t.importDeclaration(
                [t.importDefaultSpecifier(specifier.local)],
                t.stringLiteral(
                  `${LUCIDE_REACT_NATIVE}/dist/esm/icons/${specifier.local.name.replace(/[A-Z|0-9]/g, (match, offset) => (offset > 0 ? "-" : "") + match.toLowerCase())}`
                )
              )
            ),
          ]);
        }
      },
    },
  };
}
