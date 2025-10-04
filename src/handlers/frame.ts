import type { GenerationContext } from "../core/context";
import { hasChildren } from "../utils/node";
import { createJsxElement } from "../utils/jsx";
import { processChildren } from "./children";

export async function handleFrameNode(
  node: FrameNode,
  context: GenerationContext,
  generateJsx: (
    node: SceneNode,
    context: GenerationContext
  ) => Promise<string | null>
): Promise<string | null> {
  if ("layoutMode" in node && node.layoutMode !== "NONE") {
    const layoutComponent =
      node.layoutMode === "HORIZONTAL" ? "HStack" : "VStack";
    const children = hasChildren(node)
      ? await processChildren(node, context, generateJsx)
      : null;

    return createJsxElement(layoutComponent, "", children);
  }

  return hasChildren(node) ? processChildren(node, context, generateJsx) : null;
}
