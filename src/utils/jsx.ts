import { indent } from "./format";

export function createJsxElement(
  componentName: string,
  props: string,
  children: string | null
): string {
  if (children) {
    return `<${componentName}${props}>\n${indent(
      children
    )}\n</${componentName}>`;
  }
  return `<${componentName}${props} />`;
}
