import { COMPONENT_CONFIGS } from "../config/components";

type JustifyContent = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
type AlignItems = "stretch" | "flex-start" | "center" | "flex-end" | "baseline";

function mapPrimaryAxisAlign(value: string): JustifyContent {
  switch (value) {
    case "MIN":
      return "flex-start";
    case "CENTER":
      return "center";
    case "MAX":
      return "flex-end";
    case "SPACE_BETWEEN":
      return "space-between";
    default:
      return "flex-start";
  }
}

function mapCounterAxisAlign(value: string): AlignItems {
  switch (value) {
    case "MIN":
      return "flex-start";
    case "CENTER":
      return "center";
    case "MAX":
      return "flex-end";
    case "BASELINE":
      return "baseline";
    default:
      return "stretch";
  }
}

export function createFlexProps(
  componentName: string,
  primaryAxisAlignItems: string,
  counterAxisAlignItems: string
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
