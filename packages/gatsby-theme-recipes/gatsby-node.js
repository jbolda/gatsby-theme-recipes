const crypto = require("crypto");

exports.createSchemaCustomization = ({ actions }, { sources }) => {
  const { createTypes } = actions;

  actions.createFieldExtension({
    name: "childMdxResolve",
    extend: (options, previousFieldConfig) => {
      return {
        resolve: async (source, args, context, info) => {
          const newSource = await context.nodeModel.getNodeById({
            id: source[info.fieldName]
          });
          const nextNode = await context.nodeModel.getNodeById({
            id: newSource.children[0]
          });

          return nextNode;
        }
      };
    }
  });

  const interface = `
  interface Recipes @nodeInterface {
    id: ID!
    name: String!
    ingredients: Mdx!
    directions: Mdx!
    inspiration: String!
    cooking_time: Int
    preparation_time: Int
    total_time: Int
    last_made: String
    rating: Int
    slug: String
  }`;

  const implements = sources.reduce((implement, source) => {
    implement = `
    ${implement}
      type ${source}Recipes implements Node & Recipes
        @childOf(types: ["${source}"]) {
        id: ID!
        name: String!
        ingredients: Mdx! @childMdxResolve
        directions: Mdx! @childMdxResolve
        inspiration: String!
        cooking_time: Int
        preparation_time: Int
        total_time: Int
        last_made: String
        rating: Int
        slug: String
      }
    `;
    return implement;
  }, "");

  createTypes(`
  ${interface}
  ${implements}
  `);
};

exports.onCreateNode = ({ node, actions, createNodeId, reporter }) => {
  const { createNode } = actions;

  let fieldData = {};
  if (node.internal.type === `Airtable`) {
    if (node.queryName !== "Recipes") return;

    try {
      fieldData = {
        name: node.data.name,
        ingredients: node.data.ingredients___NODE,
        directions: node.data.directions___NODE,
        inspiration: node.data.inspiration,
        cooking_time: node.data.cooking_time,
        preparation_time: node.data.preparation_time,
        total_time: node.data.total_time,
        last_made: node.data.last_made,
        rating: node.data.rating,
        slug:
          node.data.slug ||
          `/${node.data.name
            .replace(/ /g, "-")
            .replace(/[,&]/g, "")
            .toLowerCase()}/`
      };
    } catch (e) {
      reporter.error(`Something went wrong trying to access node data.`, e);
      console.log(`The related node is below:\n`, node);
      return;
    }
  } else {
    // return if we don't find a built-in node
    return;
  }

  createNode({
    id: createNodeId(`${node.id} >>> ${node.internal.type}`),
    ...fieldData,
    parent: node.id,
    children: [],
    internal: {
      type: `${node.internal.type}Recipes`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
      content: JSON.stringify(fieldData), // optional
      description: `${node.internal.type}Recipe: "implements the Recipes interface"`
    }
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const recipes = require.resolve(`./src/templates/recipeTemplate.js`);

    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
          {
            allRecipes {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          result.errors.forEach(error => {
            console.log(error);
          });

          reject(result.errors);
        }

        result.data.allRecipes.edges.forEach(edge => {
          createPage({
            path: edge.node.slug,
            component: recipes,
            context: {
              name: edge.node.name
            }
          });
        });

        return;
      })
    );
  });
};
