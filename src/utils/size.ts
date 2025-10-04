export function createSizeProps(width: number, height: number): string {
  if (width === height) {
    return ` size={${width}}`;
  }
  return ` width={${width}} height={${height}}`;
}
