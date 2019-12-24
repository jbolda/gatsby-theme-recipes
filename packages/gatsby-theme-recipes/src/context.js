/** @jsx jsx */
import {
  contextJSX,
  contextMDX,
  IsolatedThemeContext
} from "@jbolda/isolated-theme-ui-components";

// our custom pragmas, bootstrapped with our context
export const RecipeThemeContext = IsolatedThemeContext;
export const jsx = contextJSX;
export const mdx = contextMDX;
