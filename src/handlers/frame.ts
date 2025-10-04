import type { GenerationContext } from "../core/context";
import { hasChildren } from "../utils/node";
import { createJsxElement } from "../utils/jsx";
import { processChildren } from "./children";
import {
  createGapProp,
  createPaddingProps,
  createBorderRadiusProp,
} from "../utils/spacing";
import { createBackgroundColorProp } from "../utils/color";

export async function handleFrameNode(
  node: FrameNode,
  context: GenerationContext,
  generateJsx: (
    node: SceneNode,
    context: GenerationContext
  ) => Promise<string | null>
): Promise<string | null> {
  if ("layoutMode" in node && node.layoutMode !== "NONE") {
    const {
      itemSpacing,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      cornerRadius,
      fills,
    } = node;

    const layoutComponent =
      node.layoutMode === "HORIZONTAL" ? "HStack" : "VStack";
    const children = hasChildren(node)
      ? await processChildren(node, context, generateJsx)
      : null;

    const gapProp = createGapProp(itemSpacing);
    const paddingProp = createPaddingProps(
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    );
    const borderRadiusProp = createBorderRadiusProp(cornerRadius);
    const backgroundColorProp = createBackgroundColorProp(fills);
    const props = gapProp + paddingProp + borderRadiusProp + backgroundColorProp;

    return createJsxElement(layoutComponent, props, children);
  }

  return hasChildren(node) ? processChildren(node, context, generateJsx) : null;
}
