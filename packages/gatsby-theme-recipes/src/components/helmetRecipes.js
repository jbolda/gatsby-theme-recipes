import React from "react";
import { Helmet } from "react-helmet";

export default ({ recipes, siteUrl, recipePagePath }) => {
  const socialImage = !!recipes[0]?.node?.featured_image?.fluid?.src
    ? `${siteUrl}${recipes[0].node.featured_image.fluid.src}`.replace(
        "//static",
        "/static"
      )
    : null;
  return (
    <Helmet>
      <title>Recipes</title>
      <meta
        name="description"
        content="This is a list of all my favorite recipes."
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Recipes" />
      <meta property="og:url" content={`${siteUrl}${recipePagePath}`} />
      <meta
        property="og:description"
        content="This is a list of all my favorite recipes."
      />
      {!!socialImage ? (
        <meta property="og:image" content={socialImage} />
      ) : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" value={siteUrl} />
      <meta name="twitter:title" value="Recipes" />
      <meta
        name="twitter:description"
        value="This is a list of all my favorite recipes."
      />
      {!!socialImage ? (
        <meta name="twitter:image" content={socialImage} />
      ) : null}
    </Helmet>
  );
};
