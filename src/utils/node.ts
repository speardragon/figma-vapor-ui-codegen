import type { NodeWithChildren } from "../core/types";
import { COMPONENT_CONFIGS } from "../config/components";

export function hasChildren(node: SceneNode): node is NodeWithChildren {
  return "children" in node && Array.isArray(node.children);
}

export type ComponentInfo = {
  componentName: string;
  libraryType: "vapor-ui" | "core" | null;
};

export function parseComponentInfo(nodeName: string): ComponentInfo {
  if (nodeName.startsWith("💙")) {
    const componentName = nodeName.replace(/[^a-zA-Z]/g, "");
    return { componentName, libraryType: "vapor-ui" };
  }

  if (nodeName.startsWith("[core]")) {
    const componentName = nodeName
      .replace("[core]", "")
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
    return { componentName, libraryType: "core" };
  }

  const componentName = nodeName.replace(/[^a-zA-Z]/g, "");
  return { componentName, libraryType: null };
}

export function getComponentName(node: InstanceNode): string {
  return parseComponentInfo(node.name).componentName;
}

export function isAllowedComponent(componentName: string): boolean {
  return componentName in COMPONENT_CONFIGS || componentName.endsWith("Icon");
}
