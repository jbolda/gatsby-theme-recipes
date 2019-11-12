/** @jsx jsx */
import React from "react";
import { jsxPragma, mdxPragma } from "isolated-theme-ui";

export const RecipeThemeContext = React.createContext({
  theme: {},
  components: {}
});

// our custom pragmas, bootstrapped with our context
export const jsx = jsxPragma(RecipeThemeContext);
export const mdx = mdxPragma(RecipeThemeContext);
