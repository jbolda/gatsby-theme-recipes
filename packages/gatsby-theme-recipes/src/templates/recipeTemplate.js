/** @jsx jsx */
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx, mdx } from "../context";

import WrapElement from "../components/wrapElement";
import Flex from "../components/flex";
import Box from "../components/box";
import Link from "../components/link";
import Heading from "../components/heading";
import Breadcrumbs from "../components/breadcrumbs";
import FeaturedImage from "../components/featuredImage";
import Details from "../components/details";
import Inspiration from "../components/inspiration";

const SimpleRecipe = props => {
  const recipe = props.data.recipes;

  return (
    <WrapElement>
      <Flex>
        <Box>
          <Breadcrumbs
            crumbs={[
              <Link to="/">Home</Link>,
              <Link to="/recipes/">Recipes</Link>,
              <Link to={`${recipe.slug}`} aria-current="page">
                {recipe.name}
              </Link>
            ]}
          />
        </Box>
        <Box>
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
        <Box>
          <Heading as={"h2"}>Ingredients</Heading>
          <MDXRenderer scope={{ mdx }}>{recipe.ingredients.body}</MDXRenderer>
        </Box>
        <Box>
          <Heading as={"h2"}>Directions</Heading>
          <MDXRenderer scope={{ mdx }}>{recipe.directions.body}</MDXRenderer>
        </Box>
        <Box>
          <Inspiration from={recipe.inspiration} />
        </Box>
      </Flex>
    </WrapElement>
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
`;
