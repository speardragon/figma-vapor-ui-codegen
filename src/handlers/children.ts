import type { NodeWithChildren } from "../core/types";
import type { GenerationContext } from "../core/context";

export async function processChildren(
  node: NodeWithChildren,
  context: GenerationContext,
  generateJsx: (
    node: SceneNode,
    context: GenerationContext
  ) => Promise<string | null>
): Promise<string | null> {
  const childrenJsxArray = await Promise.all(
    node.children.map((child) => generateJsx(child, context))
  );
  const childrenJsx = childrenJsxArray.filter((jsx) => jsx !== null).join("\n");
  return childrenJsx || null;
}
