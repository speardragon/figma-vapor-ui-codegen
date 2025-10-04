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
import { createFlexProps } from "../utils/layout";

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
      primaryAxisAlignItems,
      counterAxisAlignItems,
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
    const flexProp = createFlexProps(
      layoutComponent,
      primaryAxisAlignItems,
      counterAxisAlignItems
    );
    const props =
      gapProp + paddingProp + borderRadiusProp + backgroundColorProp + flexProp;

    return createJsxElement(layoutComponent, props, children);
  }

  return hasChildren(node) ? processChildren(node, context, generateJsx) : null;
}
