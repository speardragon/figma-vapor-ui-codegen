import { generateProps } from "../utils/props";
import {
  ALLOWED_COMPONENT_NAMES,
  COMPONENT_CONFIGS,
} from "../config/defaultProps";

type NodeWithChildren = SceneNode & { children: readonly SceneNode[] };

function hasChildren(node: SceneNode): node is NodeWithChildren {
  return "children" in node && Array.isArray(node.children);
}

async function processChildren(
  node: NodeWithChildren,
  indent: number,
  asPlainText: boolean = false
): Promise<string | null> {
  const childrenJsxArray = await Promise.all(
    node.children.map((child) => generateJsx(child, indent, asPlainText))
  );
  const childrenJsx = childrenJsxArray.filter((jsx) => jsx !== null).join("\n");
  return childrenJsx || null;
}

function createJsxElement(
  componentName: string,
  props: string,
  children: string | null,
  indentStr: string
): string {
  if (children) {
    return `${indentStr}<${componentName}${props}>\n${children}\n${indentStr}</${componentName}>`;
  }
  return `${indentStr}<${componentName}${props} />`;
}

async function handleTextNode(
  node: TextNode,
  indentStr: string,
  asPlainText: boolean
): Promise<string> {
  console.log("TextNode characters:", node.characters, asPlainText);
  const characters = node.characters || "";
  if (asPlainText) {
    return characters;
  }
  return `${indentStr}<Text>${characters}</Text>`;
}

async function handleInstanceNode(
  node: InstanceNode,
  indent: number,
  indentStr: string
): Promise<string | null> {
  const componentName = node.name.replace(/[^a-zA-Z]/g, "");

  if (!ALLOWED_COMPONENT_NAMES.includes(componentName)) {
    return hasChildren(node) ? processChildren(node, indent) : null;
  }

  const props = generateProps(componentName, node.componentProperties);
  const usePlainText =
    COMPONENT_CONFIGS[componentName]?.plainTextChildren ?? false;

  console.log("usePlainText:", usePlainText);
  const children = hasChildren(node)
    ? await processChildren(node, indent + 1, usePlainText)
    : null;

  return createJsxElement(componentName, props, children, indentStr);
}

async function handleFrameNode(
  node: FrameNode,
  indent: number,
  indentStr: string
): Promise<string | null> {
  if ("layoutMode" in node && node.layoutMode !== "NONE") {
    const layoutComponent =
      node.layoutMode === "HORIZONTAL" ? "HStack" : "VStack";
    const children = hasChildren(node)
      ? await processChildren(node, indent + 1)
      : null;
    return createJsxElement(layoutComponent, "", children, indentStr);
  }

  return hasChildren(node) ? processChildren(node, indent) : null;
}

export async function generateJsx(
  node: SceneNode,
  indent: number = 0,
  asPlainText: boolean = false
): Promise<string | null> {
  const indentStr = "  ".repeat(indent);

  if (node.type === "TEXT") {
    return handleTextNode(node, indentStr, asPlainText);
  }

  if (node.type === "INSTANCE") {
    return handleInstanceNode(node, indent, indentStr);
  }

  if (node.type === "FRAME") {
    return handleFrameNode(node, indent, indentStr);
  }

  return null;
}
