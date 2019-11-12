module.exports = {
  siteMetadata: {},
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      apiKey: process.env.AIRTABLE_API_KEY,
      options: {
        tables: [
          {
            baseId: `appcL6Jdj7ZrhTg4q`,
            tableName: `Recipes`,
            tableView: `List`,
            queryName: `Recipes`,
            mapping: {
              ingredients: "text/markdown",
              directions: "text/markdown"
            },
            tableLinks: [`Cooking_Method`, `Style`]
          },
          {
            baseId: `appcL6Jdj7ZrhTg4q`,
            tableName: `Cooking Method`,
            tableView: `Main View`,
            queryName: `Cooking Method`,
            tableLinks: [`Recipes`]
          },
          {
            baseId: `appcL6Jdj7ZrhTg4q`,
            tableName: `Style`,
            tableView: `Main View`,
            queryName: `Style`,
            tableLinks: [`Recipes`]
          }
        ]
      }
    },
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-theme-recipes`,
      options: { sources: ["Airtable"] }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {}
    }
  ]
};
