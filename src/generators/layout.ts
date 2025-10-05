import { COMPONENT_CONFIGS } from "../config/components";
import { mapPrimaryAxisAlign, mapCounterAxisAlign } from "../utils/layout";

export function createFlexProps(
  componentName: string,
  primaryAxisAlignItems: AutoLayoutMixin["primaryAxisAlignItems"] | undefined,
  counterAxisAlignItems: AutoLayoutMixin["counterAxisAlignItems"] | undefined
): string {
  const config = COMPONENT_CONFIGS[componentName];
  const defaultJustify = config?.defaultProps.justifyContent || "flex-start";
  const defaultAlign = config?.defaultProps.alignItems || "stretch";

  const props: string[] = [];

  const justifyContent = mapPrimaryAxisAlign(primaryAxisAlignItems);
  if (justifyContent !== defaultJustify) {
    props.push(`justifyContent="${justifyContent}"`);
  }

  const alignItems = mapCounterAxisAlign(counterAxisAlignItems);
  if (alignItems !== defaultAlign) {
    props.push(`alignItems="${alignItems}"`);
  }

  return props.length > 0 ? " " + props.join(" ") : "";
}
