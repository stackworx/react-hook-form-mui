import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";

const external = [
  "react",
  "react-hook-form",
  // TODO
  "@mui/material/Autocomplete",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "mui-lab-react-hook-form",
      formats: ["es"],
      fileName: (format) => `mui-lab-react-hook-form.${format}.js`,
    },

    rollupOptions: {
      external,
      output: [
        { dir: "./dist", format: "cjs", sourcemap: true },
        {
          dir: "./dist/esm",
          format: "es",
          sourcemap: true,
          // preserveModules: true,
          manualChunks: undefined,
        },
      ],
      // output: {
      //   globals: {
      //     vue: "Vue",
      //   },
      // },
    },
  },
});
