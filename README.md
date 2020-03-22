# gatsby-theme-recipes

## Concept

This theme was designed with the intent to allow a user to gradually settle into their Gatsby site. The current ecosystem seems to rely too heavily on shadowing and use it as a crutch. Shadowing is a powerful and significant feature, but the theme creator should provide a more gradual experience that eventually leads to shadowing if necessary.

These themes seek to accomplish this by using convention then configuration then shadowing if necessary. As the user wants to address more advanced configurations, they can use the Gatsby lifecycles to bring in data and put it into the existing data model. This theme is built around a data-agnostic interface that allows customization of the data source.

## Example sites

- [Minimal](https://gatsby-theme-recipes-minimal.netlify.com/) ([Source](https://github.com/jbolda/gatsby-theme-recipes/tree/master/examples/minimal))

## Data Sources

The initial built-in source is through Airtable. You can copy [this template base](https://airtable.com/shr72BUaM4649U7ll) to get you started.

See the packages folder for specific plugin configuration.
