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
                <Link to={`${recipe.Slug}`} aria-current="page">
                  {recipe.Name}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="card">
            <div className="card-content">
              <h2 className="title has-text-centered">{recipe.Name}</h2>
              <div className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Rating</p>
                    <p className="">
                      {checkBlank(recipe.Rating)}
                      {`\u2606`}
                      /10
                    </p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Last Made</p>
                    <p className="">{checkBlank(recipe.Last_Made)}</p>
                  </div>
                </div>
              </div>
              <div className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Prep Time</p>
                    <p className="">{`Prep: ${checkBlankTime(
                      recipe.Preparation_Time
                    )}`}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Cook Time</p>
                    <p className="">{`Cooking: ${checkBlankTime(
                      recipe.Cooking_Time
                    )}`}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Total Time</p>
                    <p className="">{`Total: ${checkBlankTime(
                      recipe.Total_Time
                    )}`}</p>
                  </div>
                </div>
              </div>
              <div className="content">
                <h2 className="title">Ingredients</h2>
                <div>
                  {!recipe.Ingredients.childMdx ? (
                    <ul>
                      {recipe.Ingredients.split(`\n`).map(
                        (ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        )
                      )}
                    </ul>
                  ) : (
                    <MDXRenderer scope={{ mdx }}>
                      {recipe.Ingredients.childMdx.body}
                    </MDXRenderer>
                  )}
                </div>
                <h2 className="title">Directions</h2>
                {!recipe.Directions.childMdx ? (
                  recipe.Directions.split(`\n`).map((direction, index) => (
                    <p key={index}>{direction}</p>
                  ))
                ) : (
                  <MDXRenderer scope={{ mdx }}>
                    {recipe.Directions.childMdx.body}
                  </MDXRenderer>
                )}
              </div>
            </div>
            {recipe.Inspiration ? (
              <footer className="card-footer">
                <a
                  href={recipe.data.Inspiration}
                  className="card-footer-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Recipe Link
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
    recipes(Name: { eq: $name }) {
      id
      Name
      Directions
      Cooking_Time
      Preparation_Time
      Total_Time
      Last_Made
      Rating
      Ingredients
      Slug
    }
  }
`;

const checkBlank = value => (value ? value : `--`);
const checkBlankTime = value => (value ? `${value}m` : `--`);
