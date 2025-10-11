export type ComponentConfig = {
  defaultProps: { [propName: string]: string };
  plainTextChildren?: boolean;
  childrenAsPlaceholder?: boolean;
  compoundPattern?: boolean;
  subComponents?: {
    [subComponentName: string]: Omit<
      ComponentConfig,
      "compoundPattern" | "subComponents"
    >;
  };
};

export const COMPONENT_CONFIGS: { [componentName: string]: ComponentConfig } = {
  Avatar: {
    defaultProps: {
      size: "md",
      shape: "square",
    },
    plainTextChildren: true,
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          size: "md",
          shape: "square",
        },
      },
      Image: {
        defaultProps: {},
      },
      Fallback: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Simple: {
        defaultProps: {
          size: "md",
          shape: "square",
        },
        plainTextChildren: true,
      },
    },
  },
  Badge: {
    defaultProps: {
      color: "primary",
      size: "md",
      shape: "square",
    },
    plainTextChildren: true,
  },
  Breadcrumb: {
    defaultProps: {
      size: "md",
    },
    plainTextChildren: true,
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          size: "md",
        },
      },
      List: {
        defaultProps: {},
      },
      Item: {
        defaultProps: {},
      },
      Link: {
        defaultProps: {
          current: "false",
        },
        plainTextChildren: true,
      },
      Separator: {
        defaultProps: {},
      },
      Ellipsis: {
        defaultProps: {},
      },
    },
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
  Callout: {
    defaultProps: {
      color: "primary",
    },
    plainTextChildren: true,
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          color: "primary",
        },
      },
      Icon: {
        defaultProps: {},
      },
    },
  },
  Card: {
    defaultProps: {},
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {},
      },
      Header: {
        defaultProps: {},
      },
      Body: {
        defaultProps: {},
      },
      Footer: {
        defaultProps: {},
      },
    },
  },
  Checkbox: {
    defaultProps: {
      size: "md",
      indeterminate: "false",
      disabled: "false",
      invalid: "false",
      readOnly: "false",
    },
    plainTextChildren: true,
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          size: "md",
          indeterminate: "false",
          disabled: "false",
          invalid: "false",
          readOnly: "false",
        },
      },
      Indicator: {
        defaultProps: {},
      },
    },
  },
  Dialog: {
    defaultProps: {
      size: "md",
      modal: "true",
      dismissible: "true",
    },
    compoundPattern: true,
    plainTextChildren: true,
    subComponents: {
      Root: {
        defaultProps: {
          size: "md",
          modal: "true",
          dismissible: "true",
        },
      },
      Trigger: {
        defaultProps: {},
      },
      Portal: {
        defaultProps: {},
      },
      Overlay: {
        defaultProps: {},
      },
      Content: {
        defaultProps: {},
      },
      CombinedContent: {
        defaultProps: {},
      },
      Close: {
        defaultProps: {},
      },
      Title: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Description: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Header: {
        defaultProps: {},
      },
      Body: {
        defaultProps: {},
      },
      Footer: {
        defaultProps: {},
      },
    },
  },
  Field: {
    defaultProps: {
      disabled: "false",
      validationMode: "onBlur",
    },
    compoundPattern: true,
    plainTextChildren: true,
    subComponents: {
      Root: {
        defaultProps: {
          disabled: "false",
          validationMode: "onBlur",
        },
      },
      Label: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Description: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Error: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Success: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Validity: {
        defaultProps: {},
      },
    },
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
  InputGroup: {
    defaultProps: {},
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {},
      },
      Counter: {
        defaultProps: {},
      },
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
  Menu: {
    defaultProps: {
      side: "bottom",
      align: "center",
      disabled: "false",
      openOnHover: "false",
    },
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          side: "bottom",
          align: "center",
          disabled: "false",
          openOnHover: "false",
        },
      },
      Trigger: {
        defaultProps: {},
      },
      Portal: {
        defaultProps: {},
      },
      Content: {
        defaultProps: {},
      },
      Item: {
        defaultProps: {
          disabled: "false",
          closeOnClick: "true",
        },
        plainTextChildren: true,
      },
      Separator: {
        defaultProps: {},
      },
      Group: {
        defaultProps: {},
      },
      GroupLabel: {
        defaultProps: {},
        plainTextChildren: true,
      },
      SubmenuRoot: {
        defaultProps: {
          side: "right",
          align: "start",
          disabled: "false",
          openOnHover: "true",
        },
      },
      SubmenuContent: {
        defaultProps: {},
      },
      SubmenuTriggerItem: {
        defaultProps: {
          disabled: "false",
        },
        plainTextChildren: true,
      },
      CheckboxItem: {
        defaultProps: {
          disabled: "false",
          closeOnClick: "false",
        },
        plainTextChildren: true,
      },
      RadioGroup: {
        defaultProps: {},
      },
      RadioItem: {
        defaultProps: {
          disabled: "false",
          closeOnClick: "true",
        },
        plainTextChildren: true,
      },
    },
  },
  MultiSelect: {
    defaultProps: {
      size: "md",
      invalid: "false",
      disabled: "false",
      readOnly: "false",
      open: "false",
      defaultOpen: "false",
    },
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          size: "md",
          invalid: "false",
          disabled: "false",
          readOnly: "false",
          open: "false",
          defaultOpen: "false",
        },
      },
      Trigger: {
        defaultProps: {
          nativeButton: "true",
        },
      },
      Value: {
        defaultProps: {},
      },
      Placeholder: {
        defaultProps: {},
        plainTextChildren: true,
      },
      TriggerIcon: {
        defaultProps: {},
      },
      Portal: {
        defaultProps: {},
      },
      Positioner: {
        defaultProps: {
          side: "bottom",
          align: "start",
          sideOffset: "4",
          alignOffset: "0",
          alignItemWithTrigger: "false",
        },
      },
      Popup: {
        defaultProps: {},
      },
      Content: {
        defaultProps: {},
      },
      Item: {
        defaultProps: {},
        plainTextChildren: true,
      },
      ItemIndicator: {
        defaultProps: {},
      },
      Group: {
        defaultProps: {},
      },
      GroupLabel: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Separator: {
        defaultProps: {},
      },
    },
  },
  NavigationMenu: {
    defaultProps: {
      direction: "horizontal",
      size: "md",
      stretch: "false",
      disabled: "false",
      delayDuration: "200",
      skipDelayDuration: "300",
      orientation: "horizontal",
    },
    plainTextChildren: true,
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          direction: "horizontal",
          size: "md",
          stretch: "false",
          disabled: "false",
          delayDuration: "200",
          skipDelayDuration: "300",
          orientation: "horizontal",
        },
      },
      List: {
        defaultProps: {},
      },
      Item: {
        defaultProps: {},
      },
      Link: {
        defaultProps: {
          selected: "false",
          disabled: "false",
        },
        plainTextChildren: true,
      },
      LinkItem: {
        defaultProps: {
          selected: "false",
          disabled: "false",
        },
        plainTextChildren: true,
      },
    },
  },
  Popover: {
    defaultProps: {
      modal: "true",
      openOnHover: "false",
      delay: "0",
    },
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          modal: "true",
          openOnHover: "false",
          delay: "0",
        },
      },
      Trigger: {
        defaultProps: {
          disabled: "false",
        },
      },
      Content: {
        defaultProps: {},
      },
      Portal: {
        defaultProps: {
          keepMounted: "false",
        },
      },
      Positioner: {
        defaultProps: {
          side: "bottom",
          align: "center",
          sideOffset: "8",
          alignOffset: "0",
          collisionPadding: "8",
          collisionAvoidance: "true",
          arrowPadding: "4",
          sticky: "false",
        },
      },
      Popup: {
        defaultProps: {},
      },
      Title: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Description: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Close: {
        defaultProps: {},
      },
    },
  },
  Radio: {
    defaultProps: {
      size: "md",
      invalid: "false",
      disabled: "false",
      readOnly: "false",
      required: "false",
    },
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          size: "md",
          invalid: "false",
          disabled: "false",
          readOnly: "false",
          required: "false",
        },
      },
      Indicator: {
        defaultProps: {},
      },
    },
  },
  RadioGroup: {
    defaultProps: {
      size: "md",
      invalid: "false",
      disabled: "false",
      required: "false",
      orientation: "vertical",
      loop: "true",
      visuallyHidden: "false",
    },
    plainTextChildren: true,
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          size: "md",
          invalid: "false",
          disabled: "false",
          required: "false",
          orientation: "vertical",
          loop: "true",
          visuallyHidden: "false",
        },
      },
      Label: {
        defaultProps: {},
        plainTextChildren: true,
      },
    },
  },
  Select: {
    defaultProps: {
      size: "md",
      invalid: "false",
      disabled: "false",
      readOnly: "false",
      open: "false",
      defaultOpen: "false",
    },
    plainTextChildren: true,
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          size: "md",
          invalid: "false",
          disabled: "false",
          readOnly: "false",
          open: "false",
          defaultOpen: "false",
        },
      },
      Trigger: {
        defaultProps: {
          nativeButton: "true",
        },
      },
      Value: {
        defaultProps: {},
      },
      Placeholder: {
        defaultProps: {},
        plainTextChildren: true,
      },
      TriggerIcon: {
        defaultProps: {},
      },
      Portal: {
        defaultProps: {},
      },
      Positioner: {
        defaultProps: {
          side: "bottom",
          align: "start",
          sideOffset: "4",
          alignOffset: "0",
          alignItemWithTrigger: "false",
        },
      },
      Popup: {
        defaultProps: {},
      },
      Content: {
        defaultProps: {},
      },
      Item: {
        defaultProps: {},
        plainTextChildren: true,
      },
      ItemIndicator: {
        defaultProps: {},
      },
      Group: {
        defaultProps: {},
      },
      GroupLabel: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Separator: {
        defaultProps: {},
      },
    },
  },
  Sheet: {
    defaultProps: {
      defaultOpen: "false",
    },
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          defaultOpen: "false",
        },
      },
      Trigger: {
        defaultProps: {},
      },
      Content: {
        defaultProps: {},
      },
      Portal: {
        defaultProps: {
          keepMounted: "false",
        },
      },
      Overlay: {
        defaultProps: {},
      },
      Popup: {
        defaultProps: {},
      },
      Positioner: {
        defaultProps: {
          side: "right",
        },
      },
      Header: {
        defaultProps: {},
      },
      Body: {
        defaultProps: {},
      },
      Footer: {
        defaultProps: {},
      },
      Title: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Description: {
        defaultProps: {},
        plainTextChildren: true,
      },
      Close: {
        defaultProps: {},
      },
    },
  },
  Switch: {
    defaultProps: {
      size: "md",
      disabled: "false",
      required: "false",
      value: "on",
      visuallyHidden: "false",
      readOnly: "false",
    },
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          size: "md",
          disabled: "false",
          required: "false",
          value: "on",
          visuallyHidden: "false",
          readOnly: "false",
        },
      },
    },
  },
  Tabs: {
    defaultProps: {
      variant: "line",
      size: "md",
      orientation: "horizontal",
      disabled: "false",
      activateOnFocus: "true",
      loop: "true",
    },
    plainTextChildren: true,
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          variant: "line",
          size: "md",
          orientation: "horizontal",
          disabled: "false",
          activateOnFocus: "true",
          loop: "true",
        },
      },
      List: {
        defaultProps: {},
      },
      Trigger: {
        defaultProps: {
          disabled: "false",
        },
        plainTextChildren: true,
      },
      Indicator: {
        defaultProps: {},
      },
      Panel: {
        defaultProps: {},
      },
    },
  },
  Tooltip: {
    defaultProps: {
      openOnClick: "false",
      openOnHover: "true",
      openOnFocus: "true",
      delay: "0",
      closeDelay: "0",
      defaultOpen: "false",
      disabled: "false",
      side: "top",
      align: "center",
      sideOffset: "6",
      alignOffset: "0",
      arrowPadding: "4",
      collisionPadding: "0",
      positionMethod: "absolute",
      sticky: "partial",
      trackAnchor: "true",
    },
    plainTextChildren: true,
    compoundPattern: true,
    subComponents: {
      Root: {
        defaultProps: {
          openOnClick: "false",
          openOnHover: "true",
          openOnFocus: "true",
          delay: "0",
          closeDelay: "0",
          defaultOpen: "false",
          disabled: "false",
          side: "top",
          align: "center",
          sideOffset: "6",
          alignOffset: "0",
          arrowPadding: "4",
          collisionPadding: "0",
          positionMethod: "absolute",
          sticky: "partial",
          trackAnchor: "true",
        },
      },
      Trigger: {
        defaultProps: {},
      },
      Portal: {
        defaultProps: {
          keepMounted: "false",
        },
      },
      Content: {
        defaultProps: {},
        plainTextChildren: true,
      },
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
    plainTextChildren: true,
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
    plainTextChildren: true,
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
  "Avatar.Root": () => ' alt=""',
  "Avatar.Simple": () => ' alt=""',
  "Avatar.Image": () => ' alt=""',
};
