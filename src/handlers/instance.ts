import type { GenerationContext } from "../core/context";
import {
  hasChildren,
  getComponentName,
  isAllowedComponent,
  parseComponentInfo,
  normalizeComponentName,
} from "../utils/node";
import { createJsxElement } from "../utils/jsx";
import { COMPONENT_CONFIGS } from "../config/components";
import { processChildren } from "./children";
import { createInstanceProps } from "../utils/component-props";
import { getLibraryPath } from "../utils/imports";

export async function handleInstanceNode(
  node: InstanceNode,
  context: GenerationContext,
  generateJsx: (
    node: SceneNode,
    context: GenerationContext
  ) => Promise<string | null>
): Promise<string | null> {
  const componentName = getComponentName(node);

  if (!isAllowedComponent(componentName)) {
    return hasChildren(node)
      ? processChildren(node, context, generateJsx)
      : null;
  }

  const { componentName: parsedComponentName, libraryType } = parseComponentInfo(node.name);
  const normalizedComponentName = normalizeComponentName(parsedComponentName);
  const libraryPath = getLibraryPath(libraryType);

  if (libraryPath && context.usedComponents) {
    if (!context.usedComponents[libraryPath]) {
      context.usedComponents[libraryPath] = new Set();
    }
    const rootComponentName = normalizedComponentName.split(".")[0];
    context.usedComponents[libraryPath].add(rootComponentName);
  }

  const rootName = componentName.split(".")[0];
  const subName = componentName.split(".")[1];
  const props = createInstanceProps(componentName, node);

  let usePlainText = COMPONENT_CONFIGS[rootName]?.plainTextChildren ?? false;
  
  if (subName && COMPONENT_CONFIGS[rootName]?.subComponents?.[subName]) {
    usePlainText = COMPONENT_CONFIGS[rootName].subComponents[subName].plainTextChildren ?? false;
  }

  const children = hasChildren(node)
    ? await processChildren(
        node,
        {
          ...context,
          plainTextMode: usePlainText,
        },
        generateJsx
      )
    : null;

  return createJsxElement(normalizedComponentName, props, children);
}
