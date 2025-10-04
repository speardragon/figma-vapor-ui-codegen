import type { NodeWithChildren } from "../core/types";
import { COMPONENT_CONFIGS } from "../config/components";

export function hasChildren(node: SceneNode): node is NodeWithChildren {
  return "children" in node && Array.isArray(node.children);
}

export function getComponentName(node: InstanceNode): string {
  return node.name.replace(/[^a-zA-Z]/g, "");
}

export function isAllowedComponent(componentName: string): boolean {
  return componentName in COMPONENT_CONFIGS;
}
