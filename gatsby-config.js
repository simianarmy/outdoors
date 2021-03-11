module.exports = {
  siteMetadata: {
    title: 'Notes on Travels in Nature',
    keywords:
      'nature, travel, outdoors, hiking, backpacking, cross-country, rock climbing, cascades, sierras, trekking, adventuring, solo, ultralight, bushcraft, pacific northwest, high sierras, glaciers, volcanoes, wild, backcountry, survival',
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
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'simianarmy',
        fetchLinks: [],
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children
        ) => {},
        schemas: {
          page: require(`${__dirname}/custom_types/outing.json`),
        },
        lang: '*',
        imageImgixParams: {
          auto: 'compress,format',
          fit: 'max',
          q: 50,
        },
        imagePlaceholderImgixParams: {
          w: 100,
          blur: 15,
          q: 50,
        },
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
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
    `gatsby-mdx`,
  ],
}
