/** @jsx jsx */
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx, mdx } from "../context";

const SimpleRecipe = props => {
  const recipe = props.data.recipes;
  console.log(props);
  return (
    <div className="section">
      <div className="columns is-centered">
        <div className="column is-half">
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/recipes/">Recipes</Link>
              </li>
              <li className="is-active">
                <Link to={`${recipe.slug}`} aria-current="page">
                  {recipe.name}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="card">
            <div className="card-content">
              <h2 className="title has-text-centered">{recipe.name}</h2>
              <div className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Rating</p>
                    <p className="">
                      {checkBlank(recipe.rating)}
                      {`\u2606`}
                      /10
                    </p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Last Made</p>
                    <p className="">{checkBlank(recipe.last_made)}</p>
                  </div>
                </div>
              </div>
              <div className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Prep Time</p>
                    <p className="">{`Prep: ${checkBlankTime(
                      recipe.preparation_time
                    )}`}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Cook Time</p>
                    <p className="">{`Cooking: ${checkBlankTime(
                      recipe.cooking_time
                    )}`}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Total Time</p>
                    <p className="">{`Total: ${checkBlankTime(
                      recipe.total_time
                    )}`}</p>
                  </div>
                </div>
              </div>
              <div className="content">
                <h2 className="title">Ingredients</h2>
                <div>
                  {!recipe.ingredients.body ? (
                    <ul>
                      {recipe.ingredients
                        .split(`\n`)
                        .map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                  ) : (
                    <MDXRenderer scope={{ mdx }}>
                      {recipe.ingredients.body}
                    </MDXRenderer>
                  )}
                </div>
                <h2 className="title">Directions</h2>
                {!recipe.directions.body ? (
                  recipe.directions
                    .split(`\n`)
                    .map((direction, index) => <p key={index}>{direction}</p>)
                ) : (
                  <MDXRenderer scope={{ mdx }}>
                    {recipe.directions.body}
                  </MDXRenderer>
                )}
              </div>
            </div>
            {recipe.Inspiration ? (
              <footer className="card-footer">
                <a
                  href={recipe.data.inspiration}
                  className="card-footer-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inspired By
                </a>
              </footer>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleRecipe;

export const pageQuery = graphql`
  query GatsbyThemeRecipesRecipesByName($name: String!) {
    recipes(name: { eq: $name }) {
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
      slug
    }
  }
`;

const checkBlank = value => (value ? value : `--`);
const checkBlankTime = value => (value ? `${value}m` : `--`);
