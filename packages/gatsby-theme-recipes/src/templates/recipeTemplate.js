/** @jsx jsx */
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx, mdx } from "../context";
import { Helmet } from "react-helmet";

import WrapElement from "../components/wrapElement";
import Flex from "../components/flex";
import Box from "../components/box";
import Heading from "../components/heading";
import Link from "../components/link";
import NavElement from "../components/navElement";
import FeaturedImage from "../components/featuredImage";
import Details from "../components/details";
import Inspiration from "../components/inspiration";

const SimpleRecipe = props => {
  const recipe = props.data.recipes;

  return (
    <WrapElement>
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
        <meta name="twitter:label1" content="Total Time" />
        <meta name="twitter:data1" content={recipe.total_time} />
        <meta name="twitter:label2" content="Cook Time" />
        <meta name="twitter:data2" content={recipe.cooking_time} />
      </Helmet>
      <NavElement
        crumbs={[
          <Link to="/">Home</Link>,
          <Link to={props.data.recipePage.path}>Recipes</Link>,
          <Link to={recipe.slug} aria-current="page">
            {recipe.name}
          </Link>
        ]}
      >
        <Flex>
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
      </NavElement>
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
