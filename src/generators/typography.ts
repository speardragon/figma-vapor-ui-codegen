import { TYPOGRAPHY_VARIANTS } from "../tokens/typography";
import { COMPONENT_CONFIGS } from "../config/components";
import { normalizeValue } from "../utils/typography";

export function createTypographyProp(
  node: TextNode,
  componentName: string
): string {
  const defaultValue =
    COMPONENT_CONFIGS[componentName]?.defaultProps.typography || "body1";

  if (
    node.lineHeight === figma.mixed ||
    node.letterSpacing === figma.mixed ||
    node.fontSize === figma.mixed ||
    node.fontWeight === figma.mixed
  ) {
    return "";
  }

  if (typeof node.lineHeight === "object" && node.lineHeight.unit === "AUTO") {
    return "";
  }

  if (
    typeof node.lineHeight !== "object" ||
    typeof node.letterSpacing !== "object"
  ) {
    return "";
  }

  const lineHeight = normalizeValue(node.lineHeight.value);

  const letterSpacing =
    node.letterSpacing.unit === "PERCENT"
      ? `${(node.letterSpacing.value / 100).toFixed(1)}em`
      : `${node.letterSpacing.value.toFixed(1)}px`;

  const fontSize = normalizeValue(node.fontSize);
  const fontWeight = String(node.fontWeight);

  for (const [variantKey, variantStyle] of Object.entries(
    TYPOGRAPHY_VARIANTS
  )) {
    if (
      variantStyle.lineHeight === lineHeight &&
      variantStyle.letterSpacing === letterSpacing &&
      variantStyle.fontSize === fontSize &&
      variantStyle.fontWeight === fontWeight
    ) {
      if (variantKey === defaultValue) {
        return "";
      }
      return ` typography="${variantKey}"`;
    }
  }

  return "";
}
