import React from "react";
import Img from "gatsby-image";
import { AspectRatio } from "theme-ui";

export default ({ image, sx }) =>
  !image || !image.fluid ? null : (
    <AspectRatio ratio={4 / 3}>
      <Img fluid={image.fluid} alt="Image of Recipe" sx={{ ...sx }} />
    </AspectRatio>
  );
