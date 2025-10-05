import type { GenerationContext } from "./context";
import { handleTextNode } from "../handlers/text";
import { handleInstanceNode } from "../handlers/instance";
import { handleFrameNode } from "../handlers/frame";

export async function generateJsx(
  node: SceneNode,
  context: GenerationContext = { plainTextMode: false }
): Promise<string | null> {
  if (node.visible === false) {
    return null;
  }
  console.log("node", node.name, node.type);

  switch (node.type) {
    case "TEXT":
      return handleTextNode(node, context);
    case "INSTANCE":
      return handleInstanceNode(node, context, generateJsx);
    case "FRAME":
      return handleFrameNode(node, context, generateJsx);
    default:
      return null;
  }
}
