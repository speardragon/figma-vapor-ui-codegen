export function generateProps(properties: ComponentProperties | undefined): string {
  if (!properties) return "";

  const props: string[] = [];

  for (const [key, prop] of Object.entries(properties)) {
    if (prop.type === "BOOLEAN") {
      if (prop.value === true) {
        props.push(key);
      }
    } else if (prop.type === "VARIANT" || prop.type === "TEXT") {
      props.push(`${key}="${prop.value}"`);
    } else {
      props.push(`${key}="${prop.value}"`);
    }
  }

  return props.length > 0 ? " " + props.join(" ") : "";
}
