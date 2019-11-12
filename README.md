# gatsby-theme-recipes

The initial built-in source is through Airtable. You can copy [this template base](https://airtable.com/shr72BUaM4649U7ll) to get you started.

## Config
```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-recipes`,
      options: {
        sources: ["Airtable"], // required, only built-in currently
        rootBase: "/recipes/", // default, enter custom or false for no page
      }
    }
  ]
}
```
