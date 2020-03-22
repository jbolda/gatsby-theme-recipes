import React from "react";
import { Flex, Text } from "theme-ui";

export default ({ items }) => (
  <Flex
    sx={{ flexDirection: ["row", null, "column"], width: [null, null, "25%"] }}
  >
    {items.map(item => (
      <Text
        key={item.label}
        sx={{ px: 6, py: 1, textAlign: ["center", "center", "right"] }}
      >
        {`${item.label}: ${check(item.label)(item.detail)}`}
      </Text>
    ))}
  </Flex>
);

const checkBlank = value => (value ? `${value}` : `--`);
const checkBlankTime = value => (value ? `${value}m` : `--`);
const check = label => (label.includes("Time") ? checkBlankTime : checkBlank);
