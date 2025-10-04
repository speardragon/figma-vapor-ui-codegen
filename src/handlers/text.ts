import type { GenerationContext } from "../core/context";
import { createForegroundProp } from "../generators/color";
import { createTypographyProp } from "../generators/typography";
import { createJsxElement } from "../utils/jsx";

export async function handleTextNode(
  node: TextNode,
  context: GenerationContext
): Promise<string> {
  const characters = node.characters || "";

  if (context.plainTextMode) {
    return characters;
  }

  const foregroundProp = createForegroundProp(node.fills, "Text");
  const typographyProp = createTypographyProp(node, "Text");
  const props = typographyProp + foregroundProp;

  return createJsxElement("Text", props, characters);
}
