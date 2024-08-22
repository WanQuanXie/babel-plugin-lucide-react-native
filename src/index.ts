import { addDefault } from "@babel/helper-module-imports";
import { LUCIDE_REACT_NATIVE } from "./const";
import { resolveModule } from "./modules";
import type babelCore from "@babel/core";

type Core = typeof babelCore;

function isSpecialTypes(t: Core["types"], node: babelCore.Node) {
  return t.isMemberExpression(node) || t.isProperty(node);
}

interface Config extends babelCore.PluginPass {
  opts: {
    useES?: boolean;
  };
}

type IconName = string;
type LocalName = babelCore.types.Identifier["name"];
type ImportedName = babelCore.types.Identifier["name"];

export default function lucideReactNativeImport({
  types: t,
}: Core): babelCore.PluginObj<Config> {
  // Track the icons that have already been used to prevent dupe imports
  let selectedIcons: Record<IconName, babelCore.types.Identifier> =
    Object.create(null);
  let specifiedLocal4Imported: Record<LocalName, ImportedName> =
    Object.create(null);
  let removablePaths: babelCore.NodePath[] = [];

  // Import a Lucide icon and return the computed import identifier
  function importMethod(
    useES: boolean,
    iconName: string,
    nodePath: babelCore.NodePath,
    nameHint: string
  ) {
    const existedImport = selectedIcons[iconName];

    if (existedImport) {
      return t.cloneNode(existedImport);
    }

    const moduleSource = resolveModule(useES, iconName);
    const defaultImportIdentifier = addDefault(nodePath, moduleSource, {
      nameHint,
    });
    selectedIcons[iconName] = defaultImportIdentifier;

    return t.cloneNode(defaultImportIdentifier);
  }

  function matchesLucideIcon(path: babelCore.NodePath, iconLocalName: string) {
    return (
      specifiedLocal4Imported[iconLocalName] &&
      hasBindingOfType(path.scope, iconLocalName, "ImportSpecifier")
    );
  }

  function hasBindingOfType(
    scope: babelCore.NodePath["scope"],
    iconLocalName: string,
    type: babelCore.NodePath["type"]
  ) {
    return (
      scope.hasBinding(iconLocalName) &&
      scope.getBinding(iconLocalName)?.path.type === type
    );
  }

  return {
    name: LUCIDE_REACT_NATIVE,
    visitor: {
      Program: {
        enter() {
          selectedIcons = Object.create(null);
          specifiedLocal4Imported = Object.create(null);
          removablePaths = [];
        },
        exit() {
          removablePaths
            .filter((path) => !path.removed)
            .forEach((path) => path.remove());
        },
      },
      ImportDeclaration(path) {
        const nodeSourceValue = path.node.source.value;
        const nodeSpecifiers = path.node.specifiers;

        if (nodeSourceValue === LUCIDE_REACT_NATIVE) {
          nodeSpecifiers.forEach((spec) => {
            if (t.isImportSpecifier(spec) && t.isIdentifier(spec.imported)) {
              specifiedLocal4Imported[spec.local.name] = spec.imported.name;
            } else {
              throw new Error(
                `Only named identifier imports are supported yet by this plugin-${LUCIDE_REACT_NATIVE}`
              );
            }
          });

          path.replaceWith(t.nullLiteral());
          removablePaths.push(path);
        }
      },
      ExportNamedDeclaration(path, state) {
        const { node } = path;
        const { useES = false } = state.opts;

        // handle directly re-exporting from lucide-react-native
        if (node.source && node.source.value === LUCIDE_REACT_NATIVE) {
          const specifiers: babelCore.types.ExportSpecifier[] = [];

          node.specifiers.forEach((spec) => {
            if (
              t.isExportNamespaceSpecifier(spec) ||
              t.isExportDefaultSpecifier(spec)
            ) {
              throw new Error(
                `Only named identifier exports are supported yet by this plugin-${LUCIDE_REACT_NATIVE}`
              );
            }

            const exportedName = t.isIdentifier(spec.exported)
              ? spec.exported.name
              : spec.exported.value;
            const localName = spec.local.name;

            const importIdentifier = importMethod(
              useES,
              localName,
              path,
              exportedName
            );

            const exportIdentifier = t.identifier(exportedName);

            specifiers.push(
              t.exportSpecifier(importIdentifier, exportIdentifier)
            );
          });

          node.specifiers = specifiers;
          node.source = null;
        }
      },
      ExportAllDeclaration(path) {
        const { node } = path;
        if (node.source.value === LUCIDE_REACT_NATIVE) {
          throw new Error(
            `\`export * from "${LUCIDE_REACT_NATIVE}"\` defeats the purpose of babel-plugin-${LUCIDE_REACT_NATIVE}`
          );
        }
      },
      JSXIdentifier(path, state) {
        const { node, parent } = path;

        const { name: localName } = node;
        const { useES = false } = state.opts;

        const iconImportedName = specifiedLocal4Imported[localName];

        if (
          matchesLucideIcon(path, localName) &&
          !isSpecialTypes(t, parent) &&
          iconImportedName
        ) {
          const newNode = importMethod(
            useES,
            iconImportedName,
            path,
            localName
          );
          path.replaceWith(t.jsxIdentifier(newNode.name));
        }
      },
      Identifier(path, state) {
        const { node, parent } = path;

        const { name: localName } = node;
        const { useES = false } = state.opts;

        const iconImportedName = specifiedLocal4Imported[localName];

        if (
          matchesLucideIcon(path, localName) &&
          !isSpecialTypes(t, parent) &&
          iconImportedName
        ) {
          const newNode = importMethod(
            useES,
            iconImportedName,
            path,
            localName
          );
          path.replaceWith({ type: newNode.type, name: newNode.name });
        }
      },
    },
  };
}
