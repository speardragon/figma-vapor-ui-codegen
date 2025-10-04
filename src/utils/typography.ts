export function normalizeValue(value: number | string): string {
  if (typeof value === "number") {
    return `${value}px`;
  }
  return value;
}
