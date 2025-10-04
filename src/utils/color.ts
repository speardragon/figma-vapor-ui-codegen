import { COLOR_TOKENS } from "../tokens/color";

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
}

function findColorToken(hex: string): string | null {
  if (COLOR_TOKENS.black === hex) return '$black';
  if (COLOR_TOKENS.white === hex) return '$white';
  if (COLOR_TOKENS.canvas === hex) return '$canvas';

  for (const [colorName, colorValues] of Object.entries(COLOR_TOKENS)) {
    if (typeof colorValues === 'string') continue;
    
    for (const [shade, hexValue] of Object.entries(colorValues)) {
      if (hexValue === hex) {
        return `$${colorName}-${shade}`;
      }
    }
  }

  return null;
}

function getBackgroundColorFromFills(fills: readonly Paint[]): string | null {
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
  return findColorToken(hex);
}

export function createBackgroundColorProp(
  fills: typeof figma.mixed | readonly Paint[],
  defaultValue = "transparent"
): string | undefined {
  if (!fills || fills === figma.mixed) return undefined;

  const color = getBackgroundColorFromFills(fills);

  if (!color || color === defaultValue) {
    return "";
  }

  return ` backgroundColor="${color}"`;
}
