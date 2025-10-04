import { generateJsx } from "./src/generators/jsx";

if (figma.editorType === "dev" && figma.mode === "codegen") {
  figma.codegen.on("generate", async ({ node }) => {
    const code = await generateJsx(node);

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
