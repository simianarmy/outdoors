const linkResolver = require('./src/utils/link-resolver')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Notes on Travels in Nature',
    keywords:
      'nature, travel, outdoors, hiking, backpacking, thru-hiking, ultralight, cross-country, rock climbing, cascades, sierras, trekking, adventuring, solo, ultralight, bushcraft, pacific northwest, sierras, glaciers, volcanoes, wild, backcountry, survival, PCT, JMT, CDT',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `entries`,
        path: `${__dirname}/src/entries/`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 650,
            },
          },
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Marc's Outdoors Blog",
        short_name: 'Marc Outdoors',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-130206157-1',
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ['/tags/**'],
        // Enables Google Optimize using your container Id
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `simianarmy`,
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        linkResolver: () => (doc) => linkResolver(doc),
        schemas: {
          outing: require('./src/schemas/outing.json'),
          'thruhike-section': require('./src/schemas/thruhike-section.json'),
        },
      },
    },
  ],
}
