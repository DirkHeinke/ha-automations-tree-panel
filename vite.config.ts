import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: {
      entry: "src/automation-tree.ts",
      name: "automation-tree",
      fileName: "automation-tree",
      formats: ["es"],
    },
  },
});
