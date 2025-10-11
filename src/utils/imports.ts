export type LibraryImports = {
  [libraryPath: string]: Set<string>;
};

export function getLibraryPath(
  libraryType: "vapor-ui" | "core" | null
): string | null {
  switch (libraryType) {
    case "vapor-ui":
      return "@vapor-ui/core";
    case "core":
      return "@goorm-dev/vapor-core";
    default:
      return null;
  }
}

export function generateImportStatements(imports: LibraryImports): string[] {
  const statements: string[] = [];

  for (const [libraryPath, components] of Object.entries(imports)) {
    if (components.size === 0) continue;

    const sortedComponents = Array.from(components).sort();
    const componentList = sortedComponents.join(", ");
    statements.push(`import { ${componentList} } from "${libraryPath}";`);
  }

  return statements;
}
