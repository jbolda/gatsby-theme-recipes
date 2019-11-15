/** @jsx jsx */
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx, mdx } from "../context";

import WrapElement from "../components/wrapElement";
import Flex from "../components/flex";
import Box from "../components/box";
import Link from "../components/link";
import Heading from "../components/heading";
import NavElement from "../components/navElement";

const RecipePage = props => {
  const recipes = props.data.allRecipes.edges;
  return (
    <WrapElement>
      <NavElement
        crumbs={[
          <Link to="/">Home</Link>,
          <Link to={props.data.recipePage.path}>Recipes</Link>
        ]}
      >
        <Flex direction="row">
          {recipes.map(recipe => (
            <Box key={recipe.node.slug} width={["95%", "75%", "25%"]}>
              <Heading>
                <Link to={recipe.node.slug}>{recipe.node.name}</Link>
              </Heading>
              <Heading as={"h2"}>Ingredients</Heading>
              <MDXRenderer scope={{ mdx }}>
                {recipe.node.ingredients.body}
              </MDXRenderer>
              <hr />
            </Box>
          ))}
        </Flex>
      </NavElement>
    </WrapElement>
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
