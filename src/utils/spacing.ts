import { SPACING_TOKENS, BORDER_RADIUS_TOKENS } from "../tokens/spacing";

export function pixelToSpacingToken(value: number): string | null {
  return SPACING_TOKENS[value] || null;
}

export function pixelToBorderRadiusToken(value: number): string | null {
  return BORDER_RADIUS_TOKENS[value] || null;
}
