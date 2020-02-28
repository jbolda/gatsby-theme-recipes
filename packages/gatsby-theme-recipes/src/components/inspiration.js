import React from "react";
import { Text, Link, Message } from "theme-ui";

export default ({ from }) =>
  from ? (
    <Message sx={{ mx: 2, padding: 3 }}>
      <Text>Inspired by</Text>
      <Link as={"a"} href={from} target="_blank" rel="noopener noreferrer">
        {from}
      </Link>
    </Message>
  ) : null;
