import { DEFAULT_PROPS } from "../config/defaultProps";

export function generateProps(
  componentName: string,
  properties: ComponentProperties | undefined
): string {
  if (!properties) return "";

  const props: string[] = [];
  const defaultProps = DEFAULT_PROPS[componentName] || {};

  for (const [key, prop] of Object.entries(properties)) {
    if (prop.type === "VARIANT") {
      const defaultValue = defaultProps[key];
      if (prop.value !== defaultValue) {
        if (prop.value === "true" || prop.value === "false") {
          props.push(`${key}={${prop.value}}`);
        } else {
          props.push(`${key}="${prop.value}"`);
        }
      }
    }
  }

  return props.length > 0 ? " " + props.join(" ") : "";
}
