import type { GenerationContext } from "../core/context";
import {
  hasChildren,
  getComponentName,
  isAllowedComponent,
} from "../utils/node";
import { createJsxElement } from "../utils/jsx";
import { COMPONENT_CONFIGS } from "../config/components";
import { processChildren } from "./children";
import { createInstanceProps } from "../utils/component-props";

export async function handleInstanceNode(
  node: InstanceNode,
  context: GenerationContext,
  generateJsx: (
    node: SceneNode,
    context: GenerationContext
  ) => Promise<string | null>
): Promise<string | null> {
  const componentName = getComponentName(node);

  console.log("node.fills:", node.fills);
  console.log("node.componentProperties:", node.componentProperties);

  if (!isAllowedComponent(componentName)) {
    return hasChildren(node)
      ? processChildren(node, context, generateJsx)
      : null;
  }

  const props = createInstanceProps(componentName, node);

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
