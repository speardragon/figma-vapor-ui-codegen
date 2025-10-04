import { generateJsx } from "./src/core/generateJsx";

if (figma.editorType === "dev" && figma.mode === "codegen") {
  figma.codegen.on("generate", async ({ node }) => {
    const code = await generateJsx(node);
    console.log(node.type);

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
