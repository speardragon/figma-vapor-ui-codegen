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
