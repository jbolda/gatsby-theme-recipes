import React from "react";
import { Link, graphql } from "gatsby";

const Homepage = props => (
  <div>
    <div>
      <span>List of Recipe Pages</span>
    </div>
    {props.data.allRecipes.edges.map(edge => (
      <div key={edge.node.slug}>
        <Link to={edge.node.slug}>{edge.node.slug}</Link>
      </div>
    ))}
  </div>
);

export default Homepage;

export const pageQuery = graphql`
  query GatsbyThemeRecipesAllRecipes {
    allRecipes {
      edges {
        node {
          slug
        }
      }
    }
  }
`;
