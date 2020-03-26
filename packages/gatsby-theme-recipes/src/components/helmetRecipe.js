import React from "react";
import { Helmet } from "react-helmet";

export default ({ recipe, siteUrl }) => {
  const socialImage = `${siteUrl}${recipe.featured_image.fluid.src}`.replace(
    "//static",
    "/static"
  );
  return (
    <Helmet>
      <title>{recipe.name}</title>
      <meta
        name="description"
        content={`Check out the instructions to make ${recipe.name}.`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={recipe.name} />
      <meta property="og:url" content={`${siteUrl}${recipe.slug}`} />
      <meta
        property="og:description"
        content={`Check out the instructions to make ${recipe.name}.`}
      />
      {!!recipe?.featured_image?.fluid?.src ? (
        <meta property="og:image" content={socialImage} />
      ) : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" value={siteUrl} />
      <meta name="twitter:title" value={recipe.name} />
      <meta
        name="twitter:description"
        value={`Check out the instructions to make ${recipe.name}.`}
      />
      {!!recipe?.featured_image?.fluid?.src ? (
        <meta name="twitter:image" content={socialImage} />
      ) : null}
      <meta name="twitter:label1" content="Total Time" />
      <meta name="twitter:data1" content={recipe.total_time} />
      <meta name="twitter:label2" content="Cook Time" />
      <meta name="twitter:data2" content={recipe.cooking_time} />
    </Helmet>
  );
};
