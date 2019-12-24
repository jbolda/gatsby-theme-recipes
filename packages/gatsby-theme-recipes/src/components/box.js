import React from "react";
import { Box } from "@jbolda/isolated-theme-ui-components";

export default Box;
export const old = ({ width = ["95%", "85%", "50%"], children }) => (
  <div sx={{ width, padding: 3 }}>{children}</div>
);
