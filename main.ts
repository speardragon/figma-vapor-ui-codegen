import { generateJsx } from "./src/core/generateJsx";

if (figma.editorType === "dev" && figma.mode === "codegen") {
  figma.codegen.on("generate", async ({ node }) => {
    const code = await generateJsx(node);

    if (!code) {
      return [
        {
          language: "TYPESCRIPT",
          code: "/** 코드 보기를 지원하지 않는 요소입니다. */",
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
