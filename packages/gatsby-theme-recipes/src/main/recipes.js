import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Flex, Box, Heading, Link, Divider } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";

import NavElement from "../components/navElement";
import HelmetRecipes from "../components/helmetRecipes";
import FeaturedImage from "../components/featuredImage";

const RecipePage = props => {
  const recipes = props.data.allRecipes.edges;
  return (
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
      <HelmetRecipes
        recipes={recipes}
        siteUrl={props.pageContext.siteUrl}
        recipePagePath={props.recipePage.path}
      />
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
