import React from "react";
import { Link } from "@jbolda/isolated-theme-ui-components";
import { Link as GatsbyLink } from "gatsby";

export default Link;
export const old = ({ to, children }) => (
  <GatsbyLink to={to} sx={{ color: "text" }}>
    {children}
  </GatsbyLink>
);
