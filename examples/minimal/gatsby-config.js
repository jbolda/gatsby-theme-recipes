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
              images: "fileNode",
              ingredients: "text/markdown",
              directions: "text/markdown"
            },
            separateMapTypes: true,
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
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-theme-recipes`,
      options: {
        siteUrl: "https://gatsby-theme-recipes-minimal.netlify.com",
        sources: ["Airtable"]
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {}
    },
    `gatsby-plugin-react-helmet`
  ]
};
