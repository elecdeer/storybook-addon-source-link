function managerEntries(entry = []) {
  return [...entry, import.meta.resolve("./dist/manager.js")];
}

export { managerEntries };
export * from "./dist/preset.js";
