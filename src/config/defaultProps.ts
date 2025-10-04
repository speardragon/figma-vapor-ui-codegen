export type ComponentDefaultProps = {
  [componentName: string]: {
    [propName: string]: string;
  };
};

export type ComponentConfig = {
  defaultProps: ComponentDefaultProps[string];
  plainTextChildren?: boolean;
};

export const COMPONENT_CONFIGS: { [componentName: string]: ComponentConfig } = {
  Button: {
    defaultProps: {
      color: "primary",
      size: "md",
      variant: "fill",
      disabled: "false",
    },
    plainTextChildren: true,
  },
  Badge: {
    defaultProps: {
      variant: "default",
      size: "medium",
    },
    plainTextChildren: true,
  },
  Text: {
    defaultProps: {},
  },
};

export const DEFAULT_PROPS: ComponentDefaultProps = Object.entries(
  COMPONENT_CONFIGS
).reduce((acc, [key, config]) => {
  acc[key] = config.defaultProps;
  return acc;
}, {} as ComponentDefaultProps);

export const ALLOWED_COMPONENT_NAMES = Object.keys(COMPONENT_CONFIGS);
