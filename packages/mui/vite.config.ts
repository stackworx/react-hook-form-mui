import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";

const external = [
  "react",
  "react/jsx-runtime",
  "react-hook-form",
  "@mui/material/Autocomplete",
  "@mui/material/Checkbox",
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
      name: "react-hook-form-mui",
      formats: ["es"],
      fileName: (format) => `react-hook-form-mui.${format}.js`,
    },
    minify: false,
    rollupOptions: {
      external,
      output: [
        {
          format: "es",
          dir: "./dist",
          sourcemap: true,
          preserveModules: true,
          entryFileNames: ({ name: fileName }) => {
            return `${fileName}.js`;
          },
          // entryFileNames: (entry) => {
          //   const { name, facadeModuleId } = entry;
          //   const fileName = `${name}.js`;
          //   if (!facadeModuleId) {
          //     return fileName;
          //   }
          //   const relativeDir = path.relative(
          //     path.resolve(__dirname, "src"),
          //     path.dirname(facadeModuleId)
          //   );
          //   return path.join(relativeDir, fileName);
          // },
          // manualChunks: undefined,
          // manualChunks: (id) => path.parse(id).name,
        },
      ],
    },
  },
});
