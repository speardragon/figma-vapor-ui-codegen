import type { GenerationContext } from "../core/context";
import { createForegroundProp } from "../utils/color";

export async function handleTextNode(
  node: TextNode,
  context: GenerationContext
): Promise<string> {
  const characters = node.characters || "";

  if (context.plainTextMode) {
    return characters;
  }

  const foregroundProp = createForegroundProp(node.fills);
  console.log("foregroundProp", foregroundProp);

  return `<Text${foregroundProp}>${characters}</Text>`;
}
