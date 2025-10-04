import { generateProps } from "../utils/props";

export function generateJsx(
  node: SceneNode,
  indent: number = 0
): string | null {
  const indentStr = "  ".repeat(indent);

  if (node.type === "TEXT") {
    const characters = node.characters || "";
    return `${indentStr}<Text>${characters}</Text>`;
  }

  if (node.type === "INSTANCE") {
    const componentName = node.name.replace(/[^a-zA-Z]/g, "");
    const props = generateProps(componentName, node.componentProperties);

    if ("children" in node && node.children.length > 0) {
      const childrenJsx = node.children
        .map((child) => generateJsx(child, indent + 1))
        .filter((jsx) => jsx !== null)
        .join("\n");

      if (childrenJsx) {
        return `${indentStr}<${componentName}${props}>\n${childrenJsx}\n${indentStr}</${componentName}>`;
      }
    }

    return `${indentStr}<${componentName}${props} />`;
  }

  if (node.type === "FRAME") {
    if ("layoutMode" in node && node.layoutMode !== "NONE") {
      const layoutComponent =
        node.layoutMode === "HORIZONTAL" ? "HStack" : "VStack";

      if ("children" in node && node.children.length > 0) {
        const childrenJsx = node.children
          .map((child) => generateJsx(child, indent + 1))
          .filter((jsx) => jsx !== null)
          .join("\n");

        if (childrenJsx) {
          return `${indentStr}<${layoutComponent}>\n${childrenJsx}\n${indentStr}</${layoutComponent}>`;
        }
      }

      return `${indentStr}<${layoutComponent} />`;
    }
  }

  return null;
}
