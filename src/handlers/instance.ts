import type { GenerationContext } from "../core/context";
import {
  hasChildren,
  getComponentName,
  isAllowedComponent,
} from "../utils/node";
import { generateProps } from "../utils/props";
import { createJsxElement } from "../utils/jsx";
import { COMPONENT_CONFIGS } from "../config/components";
import { processChildren } from "./children";
import { createSizeProps } from "../utils/size";

export async function handleInstanceNode(
  node: InstanceNode,
  context: GenerationContext,
  generateJsx: (
    node: SceneNode,
    context: GenerationContext
  ) => Promise<string | null>
): Promise<string | null> {
  const componentName = getComponentName(node);

  console.log(componentName, node.type, node.width, node.height);

  if (!isAllowedComponent(componentName)) {
    return hasChildren(node)
      ? processChildren(node, context, generateJsx)
      : null;
  }

  let props = generateProps(componentName, node.componentProperties);

  if (componentName.endsWith("Icon")) {
    props += createSizeProps(node.width, node.height);
  }

  const usePlainText =
    COMPONENT_CONFIGS[componentName]?.plainTextChildren ?? false;

  const children = hasChildren(node)
    ? await processChildren(
        node,
        {
          plainTextMode: usePlainText,
        },
        generateJsx
      )
    : null;

  return createJsxElement(componentName, props, children);
}
