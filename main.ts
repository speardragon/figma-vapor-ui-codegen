import { generateJsx } from "./src/core/generateJsx";
import { generateImportStatements } from "./src/utils/imports";

if (figma.editorType === "dev" && figma.mode === "codegen") {
  figma.codegen.on("generate", async ({ node }) => {
    const usedComponents = {};
    const code = await generateJsx(node, { plainTextMode: false, usedComponents });

    if (!code) {
      return [
        {
          language: "TYPESCRIPT",
          code: "/** 코드 보기를 지원하지 않는 요소입니다. */",
          title: "@vapor-ui/core",
        },
      ];
    }

    const results: CodegenResult[] = [];

    const importStatements = generateImportStatements(usedComponents);
    if (importStatements.length > 0) {
      results.push({
        language: "TYPESCRIPT",
        code: importStatements.join("\n"),
        title: "Imports",
      });
    }

    results.push({
      language: "TYPESCRIPT",
      code: code,
      title: "Component",
    });

    return results;
  });
}
