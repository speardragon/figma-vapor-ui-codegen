export type ComponentConfig = {
  defaultProps: { [propName: string]: string };
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
