import {
  BASE_BASIC_COLORS,
  LIGHT_BASIC_COLORS,
  LIGHT_SEMANTIC_COLORS,
  FOREGROUND_VARIANTS,
} from "../tokens/color";
import { COMPONENT_CONFIGS } from "../config/components";

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
}

function findColorToken(hex: string): string | null {
  if (BASE_BASIC_COLORS.black === hex) return "$black";
  if (BASE_BASIC_COLORS.white === hex) return "$white";
  if (LIGHT_SEMANTIC_COLORS.background.canvas === hex) return "$canvas";

  for (const [colorName, colorValues] of Object.entries(LIGHT_BASIC_COLORS)) {
    if (typeof colorValues === "string") continue;

    for (const [shade, hexValue] of Object.entries(colorValues)) {
      if (hexValue === hex) {
        return `$${colorName}-${shade}`;
      }
    }
  }

  for (const [, categoryValues] of Object.entries(LIGHT_SEMANTIC_COLORS)) {
    for (const [semanticName, semanticValues] of Object.entries(
      categoryValues
    )) {
      if (typeof semanticValues === "string") {
        if (semanticValues === hex) {
          return `$${semanticName}`;
        }
      } else {
        for (const [shade, hexValue] of Object.entries(semanticValues)) {
          if (hexValue === hex) {
            return `$${semanticName}-${shade}`;
          }
        }
      }
    }
  }

  return null;
}

function getColorFromFills(fills: readonly Paint[]): { token: string | null; hex: string } | null {
  if (!Array.isArray(fills) || fills.length === 0) {
    return null;
  }

  const solidFill = fills.find(
    (fill) => fill.type === "SOLID" && fill.visible !== false
  );

  if (!solidFill || solidFill.type !== "SOLID") {
    return null;
  }

  const { color, opacity = 1 } = solidFill;

  if (opacity === 0) {
    return null;
  }

  const hex = rgbToHex(color.r, color.g, color.b);
  const token = findColorToken(hex);
  
  return { token, hex };
}

export function createBackgroundColorProp(
  fills: typeof figma.mixed | readonly Paint[],
  componentName: string
): string | undefined {
  if (!fills || fills === figma.mixed) return undefined;

  const defaultValue = COMPONENT_CONFIGS[componentName]?.defaultProps.backgroundColor || "transparent";
  const result = getColorFromFills(fills);

  if (!result || !result.token || result.token === defaultValue) {
    return "";
  }

  return ` backgroundColor="${result.token}"`;
}

export function createForegroundProp(
  fills: typeof figma.mixed | readonly Paint[],
  componentName: string
): string {
  if (!fills || fills === figma.mixed) return "";

  const defaultValue = COMPONENT_CONFIGS[componentName]?.defaultProps.foreground || "normal-200";
  const result = getColorFromFills(fills);

  if (!result) return "";

  for (const [variantKey, variantHex] of Object.entries(FOREGROUND_VARIANTS)) {
    if (variantHex === result.hex) {
      if (variantKey === defaultValue) {
        return "";
      }
      return ` foreground="${variantKey}"`;
    }
  }

  return ` foreground="${result.hex}"`;
}
