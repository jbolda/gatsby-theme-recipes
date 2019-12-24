import React from "react";
import { Flex } from "@jbolda/isolated-theme-ui-components";

export default Flex;
export const old = ({ direction = "row", alignItems = "center", children }) => (
  <div
    sx={{
      display: "flex",
      flexDirection: direction,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: alignItems
    }}
  >
    {children}
  </div>
);
