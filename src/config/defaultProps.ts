export type ComponentDefaultProps = {
  [componentName: string]: {
    [propName: string]: string;
  };
};

export const DEFAULT_PROPS: ComponentDefaultProps = {
  Button: {
    color: "primary",
    size: "md",
    variant: "fill",
    disabled: "false",
  },
  Badge: {
    variant: "default",
    size: "medium",
  },
};
