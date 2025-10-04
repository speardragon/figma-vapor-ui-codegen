import { pixelToSpacingToken, pixelToBorderRadiusToken } from "../utils/spacing";

export function createGapProp(
  itemSpacing: number,
  defaultValue = "$000"
): string {
  const token = pixelToSpacingToken(itemSpacing);
  if (!token || token === defaultValue) {
    return "";
  }
  return ` gap="${token}"`;
}

export function createPaddingProps(
  paddingTop: number,
  paddingRight: number,
  paddingBottom: number,
  paddingLeft: number,
  defaultValue = "$000"
): string {
  const topToken = pixelToSpacingToken(paddingTop);
  const rightToken = pixelToSpacingToken(paddingRight);
  const bottomToken = pixelToSpacingToken(paddingBottom);
  const leftToken = pixelToSpacingToken(paddingLeft);

  if (!topToken || !rightToken || !bottomToken || !leftToken) {
    return "";
  }

  if (
    topToken === rightToken &&
    rightToken === bottomToken &&
    bottomToken === leftToken
  ) {
    if (topToken === defaultValue) {
      return "";
    }
    return ` padding="${topToken}"`;
  }

  if (topToken === bottomToken || rightToken === leftToken) {
    const props: string[] = [];
    if (rightToken !== defaultValue) {
      props.push(`paddingX="${rightToken}"`);
    }
    if (topToken !== defaultValue) {
      props.push(`paddingY="${topToken}"`);
    }
    return props.length > 0 ? " " + props.join(" ") : "";
  }

  return ` paddingTop="${topToken}" paddingRight="${rightToken}" paddingBottom="${bottomToken}" paddingLeft="${leftToken}"`;
}

export function createBorderRadiusProp(
  cornerRadius: number | symbol,
  defaultValue = "$000"
): string {
  if (typeof cornerRadius === "symbol") {
    return "";
  }
  const token = pixelToBorderRadiusToken(cornerRadius);
  if (!token || token === defaultValue) {
    return "";
  }
  return ` borderRadius="${token}"`;
}
