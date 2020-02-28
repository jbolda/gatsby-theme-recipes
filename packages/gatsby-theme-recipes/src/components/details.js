import React from "react";
import { Flex, Badge } from "theme-ui";

export default ({ items }) => (
  <Flex sx={{ m: 3, flexWrap: "wrap", justifyContent: "space-around" }}>
    {items.map(item => (
      <Badge key={item.label} sx={{ px: 2 }}>
        {`${item.label}: ${check(item.label)(item.detail)}`}
      </Badge>
    ))}
  </Flex>
);

const checkBlank = value => (value ? value : `--`);
const checkBlankTime = value => (value ? `${value}` : `--`);
const check = label => (label.includes("Time") ? checkBlank : checkBlankTime);
