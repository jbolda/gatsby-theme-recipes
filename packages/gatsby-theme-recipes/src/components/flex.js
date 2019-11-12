/** @jsx jsx */
import { jsx } from "../context";

export default ({ direction = "row", children }) => (
  <div
    sx={{
      display: "flex",
      flexDirection: direction,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    {children}
  </div>
);
