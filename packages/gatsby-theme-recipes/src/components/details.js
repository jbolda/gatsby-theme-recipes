import React from "react";
import { Text } from "theme-ui";

export default ({ items }) =>
  items.map(item => (
    <Text as={"p"} key={item.label}>
      {`${item.label}: ${check(item.label)(item.detail)}`}
    </Text>
  ));

const checkBlank = value => (value ? value : `--`);
const checkBlankTime = value => (value ? `${value}` : `--`);
const check = label => (label.includes("Time") ? checkBlank : checkBlankTime);
