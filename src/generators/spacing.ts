import {
  pixelToSpacingToken,
  pixelToBorderRadiusToken,
} from "../utils/spacing";

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

  const props: string[] = [];
  const canUseY = topToken === bottomToken;
  const canUseX = rightToken === leftToken;

  if (canUseY && canUseX) {
    if (topToken !== defaultValue) {
      props.push(`paddingY="${topToken}"`);
    }
    if (rightToken !== defaultValue) {
      props.push(`paddingX="${rightToken}"`);
    }
  } else if (canUseY) {
    if (topToken !== defaultValue) {
      props.push(`paddingY="${topToken}"`);
    }
    if (rightToken !== defaultValue) {
      props.push(`paddingRight="${rightToken}"`);
    }
    if (leftToken !== defaultValue) {
      props.push(`paddingLeft="${leftToken}"`);
    }
  } else if (canUseX) {
    if (topToken !== defaultValue) {
      props.push(`paddingTop="${topToken}"`);
    }
    if (rightToken !== defaultValue) {
      props.push(`paddingX="${rightToken}"`);
    }
    if (bottomToken !== defaultValue) {
      props.push(`paddingBottom="${bottomToken}"`);
    }
  } else {
    if (topToken !== defaultValue) {
      props.push(`paddingTop="${topToken}"`);
    }
    if (rightToken !== defaultValue) {
      props.push(`paddingRight="${rightToken}"`);
    }
    if (bottomToken !== defaultValue) {
      props.push(`paddingBottom="${bottomToken}"`);
    }
    if (leftToken !== defaultValue) {
      props.push(`paddingLeft="${leftToken}"`);
    }
  }

  return props.length > 0 ? " " + props.join(" ") : "";
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
