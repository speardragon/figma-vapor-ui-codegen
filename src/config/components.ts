export type ComponentConfig = {
  defaultProps: { [propName: string]: string };
  plainTextChildren?: boolean;
  childrenAsPlaceholder?: boolean;
};

export const COMPONENT_CONFIGS: { [componentName: string]: ComponentConfig } = {
  Avatar: {
    defaultProps: {
      size: "md",
      shape: "square",
    },
    plainTextChildren: true,
  },
  Badge: {
    defaultProps: {
      color: "primary",
      size: "md",
      shape: "square",
    },
    plainTextChildren: true,
  },
  Button: {
    defaultProps: {
      color: "primary",
      size: "md",
      variant: "fill",
      disabled: "false",
    },
    plainTextChildren: true,
  },
  IconButton: {
    defaultProps: {
      color: "primary",
      size: "md",
      variant: "fill",
      disabled: "false",
      shape: "square",
    },
  },
  Icon: {
    defaultProps: {
      color: "primary",
      size: "md",
      variant: "fill",
      disabled: "false",
      shape: "square",
    },
  },
  Text: {
    defaultProps: {
      foreground: "normal-200",
      typography: "body1",
    },
  },
  Textarea: {
    defaultProps: {
      size: "md",
      disabled: "false",
      invalid: "false",
      readOnly: "false",
      resizing: "false",
      placeholder: "",
    },
    childrenAsPlaceholder: true,
  },
  TextInput: {
    defaultProps: {
      type: "text",
      color: "primary",
      placeholder: "",
      size: "md",
      disabled: "false",
      invalid: "false",
      readOnly: "false",
      required: "false",
    },
    childrenAsPlaceholder: true,
  },

  /** 레이아웃 컴포넌트 */
  HStack: {
    defaultProps: {
      gap: "$000",
      padding: "$000",
      paddingTop: "$000",
      paddingBottom: "$000",
      paddingLeft: "$000",
      paddingRight: "$000",
      borderRadius: "$000",
      backgroundColor: "transparent",
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
  },
  VStack: {
    defaultProps: {
      gap: "$000",
      padding: "$000",
      paddingTop: "$000",
      paddingBottom: "$000",
      paddingLeft: "$000",
      paddingRight: "$000",
      borderRadius: "$000",
      backgroundColor: "transparent",
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
  },
};

type SpecialPropResolver = (node: InstanceNode) => string;

export const SPECIAL_PROP_HANDLERS: Partial<
  Record<string, SpecialPropResolver>
> = {
  Button: (node) => (node.layoutGrow ? " stretch" : ""),
  IconButton: () => ' aria-label=""',
};
