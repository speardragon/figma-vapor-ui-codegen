type JustifyContent = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
type AlignItems = "stretch" | "flex-start" | "center" | "flex-end" | "baseline";

type PrimaryAxisAlign = AutoLayoutMixin["primaryAxisAlignItems"];
type CounterAxisAlign = AutoLayoutMixin["counterAxisAlignItems"];

function assertUnreachable(value: never): never {
  throw new Error(`Unexpected auto-layout alignment value: ${value}`);
}

export function mapPrimaryAxisAlign(
  value: PrimaryAxisAlign | undefined
): JustifyContent {
  if (!value) {
    return "flex-start";
  }

  switch (value) {
    case "MIN":
      return "flex-start";
    case "CENTER":
      return "center";
    case "MAX":
      return "flex-end";
    case "SPACE_BETWEEN":
      return "space-between";
    default:
      return assertUnreachable(value);
  }
}

export function mapCounterAxisAlign(
  value: CounterAxisAlign | undefined
): AlignItems {
  if (!value) {
    return "stretch";
  }

  switch (value) {
    case "MIN":
      return "flex-start";
    case "CENTER":
      return "center";
    case "MAX":
      return "flex-end";
    case "BASELINE":
      return "baseline";
    default:
      return assertUnreachable(value);
  }
}
