import React from "react";
import Img from "gatsby-image";
import { Box, AspectRatio } from "theme-ui";

export default ({ image, sxInner, sx, sxOuter }) =>
  !image || !image.fluid ? null : (
    <Box sx={{ ...sx, ...sxOuter }}>
      <AspectRatio ratio={4 / 3}>
        <Img
          fluid={image.fluid}
          alt="Image of Recipe"
          sx={{ ...sx, ...sxInner }}
        />
      </AspectRatio>
    </Box>
  );
