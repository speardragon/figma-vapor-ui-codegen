import { generateProps } from "../utils/props";
import {
  ALLOWED_COMPONENT_NAMES,
  COMPONENT_CONFIGS,
} from "../config/defaultProps";

type NodeWithChildren = SceneNode & { children: readonly SceneNode[] };

type GenerationContext = {
  indent: number;
  plainTextMode: boolean;
};

function hasChildren(node: SceneNode): node is NodeWithChildren {
  return "children" in node && Array.isArray(node.children);
}

async function processChildren(
  node: NodeWithChildren,
  context: GenerationContext
): Promise<string | null> {
  const childrenJsxArray = await Promise.all(
    node.children.map((child) => generateJsx(child, context))
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
  context: GenerationContext
): Promise<string> {
  const characters = node.characters || "";

  if (context.plainTextMode) {
    const indentStr = "  ".repeat(context.indent);
    return `${indentStr}${characters}`;
  }
  
  const indentStr = "  ".repeat(context.indent);
  return `${indentStr}<Text>${characters}</Text>`;
}

async function handleInstanceNode(
  node: InstanceNode,
  context: GenerationContext
): Promise<string | null> {
  const componentName = node.name.replace(/[^a-zA-Z]/g, "");
  const indentStr = "  ".repeat(context.indent);

  if (!ALLOWED_COMPONENT_NAMES.includes(componentName)) {
    // NOTE: Figma 컴포넌트 구조상 Button과 Text 사이에 불필요한 노드가 존재할 수 있어
    // plainTextMode를 유지하면서 자식 노드들을 순회합니다.
    // 디자이너와 협의하여 Figma 구조 개선 후 이 로직은 제거될 수 있습니다.
    return hasChildren(node) ? processChildren(node, context) : null;
  }

  const props = generateProps(componentName, node.componentProperties);
  const usePlainText =
    COMPONENT_CONFIGS[componentName]?.plainTextChildren ?? false;

  const children = hasChildren(node)
    ? await processChildren(node, {
        indent: context.indent + 1,
        plainTextMode: usePlainText,
      })
    : null;

  return createJsxElement(componentName, props, children, indentStr);
}

async function handleFrameNode(
  node: FrameNode,
  context: GenerationContext
): Promise<string | null> {
  const indentStr = "  ".repeat(context.indent);

  if ("layoutMode" in node && node.layoutMode !== "NONE") {
    const layoutComponent =
      node.layoutMode === "HORIZONTAL" ? "HStack" : "VStack";
    const children = hasChildren(node)
      ? await processChildren(node, { ...context, indent: context.indent + 1 })
      : null;
    return createJsxElement(layoutComponent, "", children, indentStr);
  }

  // NOTE: layoutMode가 NONE인 FRAME은 렌더링하지 않고 자식만 순회합니다.
  // plainTextMode를 유지하면서 자식 노드들을 처리합니다.
  return hasChildren(node) ? processChildren(node, context) : null;
}

export async function generateJsx(
  node: SceneNode,
  context: GenerationContext = { indent: 0, plainTextMode: false }
): Promise<string | null> {
  if (node.type === "TEXT") {
    return handleTextNode(node, context);
  }

  if (node.type === "INSTANCE") {
    return handleInstanceNode(node, context);
  }

  if (node.type === "FRAME") {
    return handleFrameNode(node, context);
  }

  return null;
}
