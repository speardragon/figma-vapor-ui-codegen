import { generateJsx } from "./src/core/generateJsx";

if (figma.editorType === "dev" && figma.mode === "codegen") {
  figma.codegen.on("generate", async ({ node }) => {
    const code = await generateJsx(node);

    if (!code) {
      return [
        {
          language: "TYPESCRIPT",
          code: "/** 변환 중 오류가 발생했습니다. 다시 시도해주세요. */",
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
