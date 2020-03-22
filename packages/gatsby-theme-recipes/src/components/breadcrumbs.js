import React from "react";
import { Box } from "theme-ui";

export default ({ crumbs }) => (
  <Box as={"nav"} className="breadcrumb" aria-label="breadcrumbs">
    {crumbs.map((crumb) => (
      <span key={crumb.props.to} sx={{ sx: "text" }}>
        {" "}
        / {crumb}
      </span>
    ))}
  </Box>
);
