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
    const componentName = nodeName.replace(/💙/g, "").replace(/[^a-zA-Z.]/g, "");
    return { componentName, libraryType: "vapor-ui" };
  }

  if (nodeName.startsWith("[core]")) {
    const cleaned = nodeName
      .replace("[core]", "")
      .trim()
      .replace(/[^a-zA-Z.]/g, "");
    
    const parts = cleaned.split(".");
    const componentName = parts
      .map((part) => part.replace(/^\w/, (c) => c.toUpperCase()))
      .join(".");
    
    return { componentName, libraryType: "core" };
  }

  const componentName = nodeName.replace(/[^a-zA-Z.]/g, "");
  return { componentName, libraryType: null };
}

export function getComponentName(node: InstanceNode): string {
  return parseComponentInfo(node.name).componentName;
}

function getRootComponentName(componentName: string): string {
  return componentName.split(".")[0];
}

export function isCompoundPatternComponent(componentName: string): boolean {
  const rootName = getRootComponentName(componentName);
  return COMPONENT_CONFIGS[rootName]?.compoundPattern ?? false;
}

export function isAllowedComponent(componentName: string): boolean {
  const rootName = getRootComponentName(componentName);
  
  if (rootName.endsWith("Icon")) {
    return true;
  }
  
  if (!(rootName in COMPONENT_CONFIGS)) {
    return false;
  }
  
  if (!componentName.includes(".")) {
    return true;
  }
  
  const subComponentName = componentName.split(".")[1];
  const config = COMPONENT_CONFIGS[rootName];
  
  if (!config.compoundPattern || !config.subComponents) {
    return false;
  }
  
  return subComponentName in config.subComponents;
}

export function normalizeComponentName(componentName: string): string {
  if (!componentName.includes(".") && isCompoundPatternComponent(componentName)) {
    return `${componentName}.Root`;
  }
  return componentName;
}
