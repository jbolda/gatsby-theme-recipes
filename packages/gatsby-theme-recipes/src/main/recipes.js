import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Grid, Card, Heading, Link } from "theme-ui";
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
        recipePagePath={props.data.recipePage.path}
      />
      <Grid gap={6} columns={[1, 2, 4]}>
        {recipes.map(recipe => (
          <Card key={recipe.node.slug} sx={{ padding: 3 }}>
            <Heading as="h2">
              <Link as={GatsbyLink} to={recipe.node.slug}>
                {recipe.node.name}
              </Link>
            </Heading>
            <FeaturedImage image={recipe.node.featured_image} />
            <Heading as="h3">Ingredients</Heading>
            <MDXRenderer>{recipe.node.ingredients.body}</MDXRenderer>
          </Card>
        ))}
      </Grid>
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
            fluid(maxHeight: 300, cropFocus: ATTENTION, quality: 95) {
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
