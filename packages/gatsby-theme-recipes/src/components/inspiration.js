import React from "react";
import { Box, Text, Link, Divider } from "theme-ui";

export default ({ from }) => (
  <Box sx={{ width: ["95%", "85%", "50%"], padding: 3 }}>
    <Divider />
    {from ? (
      <Link as={"a"} href={from} target="_blank" rel="noopener noreferrer">
        <Text>Inspired by {from}</Text>
      </Link>
    ) : null}
  </Box>
);
