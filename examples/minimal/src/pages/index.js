/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, graphql } from "gatsby";

const Homepage = props => (
  <div>
    <div>
      The Recipe "Homepage" can be found at{" "}
      <Link to={props.data.sitePage.path} sx={{ color: "text" }}>
        {props.data.sitePage.path}
      </Link>
    </div>
    <div>
      <span>List of Recipe Pages</span>
    </div>
    {props.data.allRecipes.edges.map(edge => (
      <div key={edge.node.slug}>
        <Link to={edge.node.slug} sx={{ color: "text" }}>
          {edge.node.slug}
        </Link>
      </div>
    ))}
  </div>
);

export default Homepage;

export const pageQuery = graphql`
  query AllRecipes {
    allRecipes {
      edges {
        node {
          slug
        }
      }
    }
    sitePage(context: { name: { eq: "recipe homepage" } }) {
      path
    }
  }
`;
