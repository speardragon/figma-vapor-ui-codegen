import { generateJsx } from "./src/generators/jsx";

if (figma.editorType === "dev" && figma.mode === "codegen") {
  figma.codegen.on("generate", ({ node }) => {
    const code = generateJsx(node, 0);

    if (!code) {
      return [
        {
          language: "TYPESCRIPT",
          code: "// Unsupported node type",
          title: "@vapor-ui/core",
        },
      ];
    }

    return [
      {
        language: "TYPESCRIPT",
        code: code,
        title: "@vapor-ui/core",
      },
    ];
  });
}
