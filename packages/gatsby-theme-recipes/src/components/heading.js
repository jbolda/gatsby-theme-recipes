import React from "react";
import { Heading } from "@jbolda/isolated-theme-ui-components";

export default Heading;
export const old = ({ as: Heading = "h1", children }) => (
  <Heading sx={{ variant: `styles.${Heading}` }}>{children}</Heading>
);
