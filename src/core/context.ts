import type { LibraryImports } from "../utils/imports";

export type GenerationContext = {
  plainTextMode: boolean;
  usedComponents?: LibraryImports;
};
