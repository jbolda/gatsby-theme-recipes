# gatsby-theme-recipes

The initial built-in source is through Airtable. You can copy [this template base](https://airtable.com/shr72BUaM4649U7ll) to get you started. You will need to install `gatsby-source-airtable` (currently requires `v2.0.11`), and set up your API key. See [`gatsby-source-airtable` docs](https://github.com/jbolda/gatsby-source-airtable) for more information on setup.

## Config
```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-airtable`, // currently requires v2.0.11
      apiKey: process.env.AIRTABLE_API_KEY,
      options: {
        tables: [
          {
            baseId: `[insert base id here]`,
            tableName: `Recipes`,
            tableView: `[whichever view you would like]`,
            queryName: `Recipes`,
            mapping: {
              images: "fileNode",
              ingredients: "text/markdown",
              directions: "text/markdown"
            },
            separateMapTypes: true
          },
      }
    },
    {
      resolve: `gatsby-theme-recipes`,
      options: {
        sources: ["Airtable"], // required, only built-in currently
        rootBase: "/recipes/", // default, enter custom url or false for no page
      }
    }
  ]
}
```
