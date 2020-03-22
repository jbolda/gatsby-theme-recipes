# gatsby-theme-recipes

The primary built-in source is through Airtable. You can copy [this template base](https://airtable.com/shr72BUaM4649U7ll) to get you started. You will need to install `gatsby-source-airtable`, and set up your API key. See [`gatsby-source-airtable` docs](https://github.com/jbolda/gatsby-source-airtable) for more information on setup.

This plugin will create a page listing all of your recipes at `/recipes/` or by your choice based on `rootBase`. We recommend also passing a `siteUrl` for SEO purposes and to drive the social media unfurls.

## Config

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-airtable`, // currently requires v2.1.0-alpha.0
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
        siteUrl: "https://gatsby-theme-recipes-minimal.netlify.com", // required for SEO and unfurls
        sources: ["Airtable"], // default, only built-in currently
        rootBase: "/recipes/", // default, enter custom url or false for no page
      }
    }
  ]
}
```

## Bring Data From Anywhere

`gatsby-theme-recipes` is based upon on an interface that is data agnostic. That means that you can supply your data from any source to this theme. We have built-in anticipated sources, but you may define your own using the `sources` array in the config and the `onCreateNode` Gatsbyjs lifecycle method. The source you define will bootstrap a proxy node that connects your data node to the interface. (You may provide your proxy node by passing an empty array to `sources`.) The proxy node expects the following values and a node type of the value as passed in the `sources` array prepended to `Recipes`.

```graphql
id: ID!
name: String!
featured_image: ImageSharp
ingredients: Mdx!
directions: Mdx!
inspiration: String
cooking_time: Int
preparation_time: Int
total_time: Int
last_made: String
rating: Int
slug: String
```
