/** @jsx jsx */
import { RecipeThemeContext, jsx } from "../context";
import theme from "../theme";

export default ({ children }) => (
  <RecipeThemeContext.Provider
    value={{
      theme
    }}
  >
    {children}
  </RecipeThemeContext.Provider>
);
