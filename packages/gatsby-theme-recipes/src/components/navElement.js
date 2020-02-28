import React, { Fragment } from "react";
import { Box } from "theme-ui";
import Breadcrumbs from "../components/breadcrumbs";

export default ({ children, crumbs }) => (
  <Fragment>
    <Box>
      <Breadcrumbs crumbs={crumbs} />
    </Box>
    {children}
  </Fragment>
);
