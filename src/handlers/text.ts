import type { GenerationContext } from "../core/context";

export async function handleTextNode(
  node: TextNode,
  context: GenerationContext
): Promise<string> {
  const characters = node.characters || "";

  if (context.plainTextMode) {
    return characters;
  }

  return `<Text>${characters}</Text>`;
}
