import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Helmet } from "react-helmet";
import { Flex, Box, Heading, Link, Divider } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";

import NavElement from "../components/navElement";
import FeaturedImage from "../components/featuredImage";

const RecipePage = props => {
  const recipes = props.data.allRecipes.edges;
  return (
    <div>
      <Helmet>
        <title>Recipes</title>
        <meta
          name="description"
          content="This is a list of all my favorite recipes."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Recipes" />
        <meta
          property="og:url"
          content={`${props.pageContext.siteUrl}${props.data.recipePage.path}`}
        />
        <meta
          property="og:description"
          content="This is a list of all my favorite recipes."
        />
        {!!recipes[0].node.featured_image &&
        !!recipes[0].node.featured_image.fluid &&
        !!recipes[0].node.featured_image.fluid.src ? (
          <meta
            property="og:image"
            content={`${props.pageContext.siteUrl}${recipes[0].node.featured_image.fluid.src}`}
          />
        ) : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" value={props.pageContext.siteUrl} />
        <meta name="twitter:title" value="Recipes" />
        <meta
          name="twitter:description"
          value="This is a list of all my favorite recipes."
        />
        {!!recipes[0].node.featured_image &&
        !!recipes[0].node.featured_image.fluid &&
        !!recipes[0].node.featured_image.fluid.src ? (
          <meta
            property="twitter:image"
            content={`${props.pageContext.siteUrl}${recipes[0].node.featured_image.fluid.src}`}
          />
        ) : null}
      </Helmet>
      <NavElement
        crumbs={[
          <Link as={GatsbyLink} to="/">
            Home
          </Link>,
          <Link as={GatsbyLink} to={props.data.recipePage.path}>
            Recipes
          </Link>
        ]}
      >
        <Flex
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "top"
          }}
        >
          {recipes.map(recipe => (
            <Box
              key={recipe.node.slug}
              sx={{ width: ["95%", "75%", "25%"], padding: 3 }}
            >
              <Heading as="h2">
                <Link as={GatsbyLink} to={recipe.node.slug}>
                  {recipe.node.name}
                </Link>
              </Heading>
              <FeaturedImage image={recipe.node.featured_image} />
              <Heading as="h3">Ingredients</Heading>
              <MDXRenderer>{recipe.node.ingredients.body}</MDXRenderer>
              <Divider />
            </Box>
          ))}
        </Flex>
      </NavElement>
    </div>
  );
};

export default RecipePage;

export const pageQuery = graphql`
  query GatsbyThemeRecipesAllRecipes {
    allRecipes {
      edges {
        node {
          id
          name
          featured_image {
            fluid(
              maxWidth: 300
              maxHeight: 300
              cropFocus: ATTENTION
              quality: 95
            ) {
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
      }
    }
    recipePage: sitePage(context: { name: { eq: "recipe homepage" } }) {
      path
    }
  }
`;
