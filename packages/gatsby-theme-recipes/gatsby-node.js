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
    ingredients: Mdx!
    directions: Mdx!
  }`;

  const implements = sources.reduce((implement, source) => {
    implement = `
    ${implement}
      type ${source}Recipes implements Node & Recipes
        @childOf(types: ["${source}"]) {
        id: ID!
        ingredients: Mdx! @childMdxResolve
        directions: Mdx! @childMdxResolve
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
        Name: node.data.Name,
        // Ingredients: node.data.Ingredients,
        // Directions: node.data.Directions,
        Inspiration: node.data.Inspiration,
        Cooking_Time: node.data.Cooking_Time,
        Preparation_Time: node.data.Preparation_Time,
        Total_Time: node.data.Total_Time,
        Last_Made: node.data.Last_Made,
        Rating: node.data.Rating,
        Slug:
          node.data.Slug ||
          `/${node.data.Name.replace(/ /g, "-")
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
                  Name
                  Slug
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
            path: edge.node.Slug,
            component: recipes,
            context: {
              name: edge.node.Name
            }
          });
        });

        return;
      })
    );
  });
};
