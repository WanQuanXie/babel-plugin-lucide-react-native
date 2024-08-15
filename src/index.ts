import type babelCore from "@babel/core";
import { partition } from "./utils";
import { LUCIDE_REACT_NATIVE } from "./const";
import { resolveModule } from "./modules";

type Core = typeof babelCore;

interface Config {
  opts: {
    useES?: boolean;
  };
}

export default function lucideReactNativeImport({
  types: t,
}: Core): babelCore.PluginObj<Config> {
  return {
    name: LUCIDE_REACT_NATIVE,
    visitor: {
      ImportDeclaration(path, state) {
        const useES = state.opts.useES ?? false;

        const nodeSourceValue = path.node.source.value;
        const nodeSpecifiers = path.node.specifiers;

        if (nodeSourceValue === LUCIDE_REACT_NATIVE) {
          const [nodeDefaultSpecifiers, nodeNamedSpecifiers] = partition(
            nodeSpecifiers,
            (specifier) => t.isImportDefaultSpecifier(specifier)
          );

          if (nodeDefaultSpecifiers.length > 0) {
            throw new Error(
              `\`import ${nodeDefaultSpecifiers[0]} from "${LUCIDE_REACT_NATIVE}"\` defeats the purpose of babel-plugin-${LUCIDE_REACT_NATIVE}`
            );
          }

          if (nodeNamedSpecifiers.length > 0) {
            const namedImportDeclarations = nodeNamedSpecifiers.map(
              (specifier) => {
                const resolvedPath = resolveModule(useES, specifier.local.name);

                return t.importDeclaration(
                  [t.importDefaultSpecifier(specifier.local)],
                  t.stringLiteral(resolvedPath)
                );
              }
            );

            path.replaceWithMultiple(namedImportDeclarations);
          }
        }
      },
    },
  };
}
