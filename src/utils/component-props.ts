import { SPECIAL_PROP_HANDLERS } from "../config/components";
import { generateProps } from "./props";
import { createSizeProps } from "./size";

export function createInstanceProps(
  componentName: string,
  node: InstanceNode
): string {
  let props = generateProps(componentName, node.componentProperties);

  const additionalProps = SPECIAL_PROP_HANDLERS[componentName]?.(node) ?? "";

  if (additionalProps) {
    props += additionalProps;
  }

  if (componentName.endsWith("Icon")) {
    props += createSizeProps(node.width, node.height);
  }

  return props;
}
