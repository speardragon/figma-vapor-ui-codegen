import { COMPONENT_CONFIGS } from "../config/components";

function isBooleanValue(value: string): boolean {
  return value === "true" || value === "false";
}

function formatPropValue(key: string, value: string): string {
  return isBooleanValue(value) ? `${key}` : `${key}="${value}"`;
}

function shouldIncludeProp(
  value: string,
  defaultValue: string | undefined
): boolean {
  return value !== defaultValue;
}

export function generateProps(
  componentName: string,
  properties: ComponentProperties | undefined
): string {
  if (!properties) return "";

  const parts = componentName.split(".");
  const rootName = parts[0];
  const subName = parts[1];
  
  let defaultProps = COMPONENT_CONFIGS[rootName]?.defaultProps || {};
  
  if (subName && COMPONENT_CONFIGS[rootName]?.subComponents?.[subName]) {
    defaultProps = COMPONENT_CONFIGS[rootName].subComponents[subName].defaultProps;
  }

  const props = Object.entries(properties)
    .filter(([key]) => !key.includes("(design only)"))
    .filter(([, prop]) => prop.type === "VARIANT")
    .filter(([key, prop]) =>
      shouldIncludeProp(prop.value as string, defaultProps[key])
    )
    .map(([key, prop]) => formatPropValue(key, prop.value as string));

  return props.length > 0 ? " " + props.join(" ") : "";
}
