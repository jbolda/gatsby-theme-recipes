import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Helmet } from "react-helmet";
import { Flex, Box, Heading, Link } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";

import NavElement from "../components/navElement";
import FeaturedImage from "../components/featuredImage";
import Details from "../components/details";
import Inspiration from "../components/inspiration";

const SimpleRecipe = props => {
  const recipe = props.data.recipes;

  return (
    <div>
      <Helmet>
        <title>{recipe.name}</title>
        <meta
          name="description"
          content={`Check out the instructions to make ${recipe.name}.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={recipe.name} />
        <meta
          property="og:url"
          content={`${props.pageContext.siteUrl}${recipe.slug}`}
        />
        <meta
          property="og:description"
          content={`Check out the instructions to make ${recipe.name}.`}
        />
        {!!recipe.featured_image &&
        !!recipe.featured_image.fluid &&
        !!recipe.featured_image.fluid.src ? (
          <meta
            property="og:image"
            content={`${props.pageContext.siteUrl}${recipe.featured_image.fluid.src}`}
          />
        ) : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" value={props.pageContext.siteUrl} />
        <meta name="twitter:title" value={recipe.name} />
        <meta
          name="twitter:description"
          value={`Check out the instructions to make ${recipe.name}.`}
        />
        {!!recipe.featured_image &&
        !!recipe.featured_image.fluid &&
        !!recipe.featured_image.fluid.src ? (
          <meta
            property="twitter:image"
            content={`${props.pageContext.siteUrl}${recipe.featured_image.fluid.src}`}
          />
        ) : null}
        <meta name="twitter:label1" content="Total Time" />
        <meta name="twitter:data1" content={recipe.total_time} />
        <meta name="twitter:label2" content="Cook Time" />
        <meta name="twitter:data2" content={recipe.cooking_time} />
      </Helmet>
      <NavElement
        crumbs={[
          <Link as={GatsbyLink} to="/">
            Home
          </Link>,
          <Link as={GatsbyLink} to={props.data.recipePage.path}>
            Recipes
          </Link>,
          <Link as={GatsbyLink} to={recipe.slug} aria-current="page">
            {recipe.name}
          </Link>
        ]}
      >
        <Flex
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box sx={{ width: ["95%", "85%", "50%"], padding: 3 }}>
            <Heading>{recipe.name}</Heading>
            <FeaturedImage image={recipe.featured_image} />
            <Details
              items={[
                { label: "Rating", detail: recipe.rating },
                { label: "Last Made", detail: recipe.last_made },
                { label: "Prep Time", detail: recipe.preparation_time },
                { label: "Cook Time", detail: recipe.cooking_time },
                { label: "Total Time", detail: recipe.total_time }
              ]}
            />
          </Box>
          {recipe?.ingredients?.body ? (
            <Box sx={{ width: ["95%", "85%", "50%"], padding: 3 }}>
              <Heading as={"h2"}>Ingredients</Heading>
              <MDXRenderer>{recipe.ingredients.body}</MDXRenderer>
            </Box>
          ) : null}
          {recipe?.directions?.body ? (
            <Box sx={{ width: ["95%", "85%", "50%"], padding: 3 }}>
              <Heading as={"h2"}>Directions</Heading>
              <MDXRenderer>{recipe.directions.body}</MDXRenderer>
            </Box>
          ) : null}
          {recipe?.notes?.body ? (
            <Box sx={{ width: ["95%", "85%", "50%"], padding: 3 }}>
              <Heading as={"h2"}>Directions</Heading>
              <MDXRenderer>{recipe.directions.body}</MDXRenderer>
            </Box>
          ) : null}
          <Box sx={{ width: ["95%", "85%", "50%"], padding: 3 }}>
            <Inspiration from={recipe.inspiration} />
          </Box>
        </Flex>
      </NavElement>
    </div>
  );
};

export default SimpleRecipe;

export const pageQuery = graphql`
  query GatsbyThemeRecipesRecipesByName($name: String!) {
    recipes(name: { eq: $name }) {
      id
      name
      featured_image {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid_noBase64
          src
        }
      }
      directions {
        body
      }
      ingredients {
        body
      }
      cooking_time
      preparation_time
      total_time
      last_made
      rating
      inspiration
      slug
    }
    recipePage: sitePage(context: { name: { eq: "recipe homepage" } }) {
      path
    }
  }
`;
