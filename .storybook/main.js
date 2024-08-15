import { dirname, join } from "path";
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions")
  ],

  "framework": {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}