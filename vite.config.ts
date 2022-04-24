import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";

const external = [
  "react",
  "react-hook-form",
  "@mui/material/Autocomplete",
  "@mui/material/Checkbox",
  "@mui/material/FormControl",
  "@mui/material/FormControlLabel",
  "@mui/material/FormHelperText",
  "@mui/material/Input",
  "@mui/material/InputBase",
  "@mui/material/InputLabel",
  "@mui/material/RadioGroup",
  "@mui/material/Select",
  "@mui/material/Switch",
  "@mui/material/TextField",
  "@mui/material/ToggleButtonGroup",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "mui-react-hook-form",
      formats: ["es"],
      fileName: (format) => `mui-react-hook-form.${format}.js`,
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
