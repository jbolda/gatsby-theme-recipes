/** @jsx jsx */
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx, mdx } from "../context";
import { Helmet } from "react-helmet";

import WrapElement from "../components/wrapElement";
import Flex from "../components/flex";
import Box from "../components/box";
import Link from "../components/link";
import Heading from "../components/heading";
import NavElement from "../components/navElement";
import FeaturedImage from "../components/featuredImage";

const RecipePage = props => {
  const recipes = props.data.allRecipes.edges;
  return (
    <WrapElement>
      <Helmet>
        <title>Recipes</title>
        <meta property="og:title" content="Recipes" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="This is a list of all my favorite recipes." />
        {!!recipes[0].node.featured_image &&
        !!recipes[0].node.featured_image.fluid &&
        !!recipes[0].node.featured_image.fluid.src ? (
          <meta
            property="og:image"
            content={`${props.pageContext.siteUrl}${recipes[0].node.featured_image.fluid.src}`}
          />
        ) : null}
      </Helmet>
      <NavElement
        crumbs={[
          <Link to="/">Home</Link>,
          <Link to={props.data.recipePage.path}>Recipes</Link>
        ]}
      >
        <Flex direction="row" alignItems="top">
          {recipes.map(recipe => (
            <Box key={recipe.node.slug} width={["95%", "75%", "25%"]}>
              <Heading as="h2">
                <Link to={recipe.node.slug}>{recipe.node.name}</Link>
              </Heading>
              <FeaturedImage image={recipe.node.featured_image} />
              <Heading as="h3">Ingredients</Heading>
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
          featured_image {
            fluid(maxHeight: 400, cropFocus: ATTENTION) {
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
