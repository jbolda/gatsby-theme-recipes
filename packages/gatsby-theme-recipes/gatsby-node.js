const crypto = require("crypto");

exports.createSchemaCustomization = (
  { actions, reporter },
  { sources = ["Airtable"] }
) => {
  const { createTypes } = actions;

  actions.createFieldExtension({
    name: "childImageSharpResolve",
    args: {
      source: { type: "String!" }
    },
    extend: (options, previousFieldConfig) => {
      return {
        resolve: async (source, args, context, info) => {
          const type = info.schema._typeMap[options.source];

          try {
            await context.nodeModel.prepareNodes(
              type, // source node
              {
                data: {
                  images: { localFiles: { childImageSharp: { id: true } } }
                }
              }, // querying for resolvable field
              {
                data: {
                  images: { localFiles: { childImageSharp: { id: true } } }
                }
              }, // resolve this field
              [type.name] // The types to use are these
            );
          } catch (e) {
            reporter.warn(`We tried to resolve an image on ${options.source},
            but an ImageSharp node does not exist. Is this mapped correctly?`);
            reporter.error(e);
            return null;
          }

          try {
            const sourceNode = await context.nodeModel.runQuery({
              type: type,
              query: { filter: { id: { eq: source.featured_image.id } } },
              firstOnly: true
            });

            const imageSharpNode = await context.nodeModel.getNodeById({
              id:
                sourceNode.__gatsby_resolved.data.images.localFiles[0]
                  .childImageSharp.id
            });

            return imageSharpNode;
          } catch (e) {
            // we catch and ignore as an image isn't required
            return null;
          }
        }
      };
    }
  });

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
    featured_image: ImageSharp
    ingredients: Mdx!
    directions: Mdx!
    inspiration: String
    cooking_time: Int
    preparation_time: Int
    total_time: Int
    last_made: Date @dateformat
    rating: Int
    slug: String
  }`;

  // TODO, check if built-in sources are installed and add them
  // to the source list automatically?
  const implements = sources.reduce((implement, source) => {
    implement = `
    ${implement}
      type ${source}Recipes implements Node & Recipes
        @childOf(types: ["${source}"]) @dontInfer {
        id: ID!
        name: String!
        featured_image: ImageSharp @childImageSharpResolve(source: "${source}")
        ingredients: Mdx! @childMdxResolve
        directions: Mdx! @childMdxResolve
        inspiration: String
        cooking_time: Int
        preparation_time: Int
        total_time: Int
        last_made: Date @dateformat
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
  if (
    node.internal.type === `Airtable` ||
    node.internal.type === `AirtableRecipes`
  ) {
    if (node.queryName !== "Recipes") return;

    try {
      fieldData = {
        name: node.data.name,
        ingredients: node.data.ingredients___NODE,
        directions: node.data.directions___NODE,
        featured_image: node,
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

exports.createPages = (
  { graphql, actions },
  { rootBase = "/recipes/", siteUrl = "" }
) => {
  const { createPage, deletePage } = actions;

  return new Promise((resolve, reject) => {
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
            component: require.resolve(`./src/templates/recipeTemplate`),
            context: {
              name: edge.node.name,
              siteUrl: siteUrl
            }
          });
        });

        // rootBase can be set to false which will create a dummy page with the
        // homepage component, and then immediately delete it. If a component has a query
        // gatsby expects it to be used, and will throw an error if it is not used.
        // We "use" it and throw it away to avoid the user seeing this error.
        createPage({
          path: rootBase === false ? "/soon-to-be-deleted/" : rootBase,
          component: require.resolve(`./src/main/recipes`),
          context: {
            name: "recipe homepage",
            siteUrl: siteUrl
          }
        });

        if (rootBase === false) {
          deletePage({
            path: "/soon-to-be-deleted/",
            component: require.resolve(`./src/main/recipes`)
          });
        }

        return;
      })
    );
  });
};
