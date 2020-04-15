module.exports = {
  siteMetadata: {
    siteUrl: `https://rallycry.ca`,
    title: 'Rally Cry - Support Hamilton Small Businesses',
    description:
      'Rally Cry is a listing of small businesses in Hamilton, Ontario that you can support during the COVID-19 pandemic.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-robots-txt',
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-TRVX64B",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false
      }
    },
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rally Cry`,
        short_name: `RallyCry`,
        start_url: `/`,
        background_color: `#a13639`,
        theme_color: `#a13639`,
        display: `standalone`,
        icons: [
          {
            "src": "img/favicon-32x32.png",
            "sizes": "32x32",
            "type": "image/png"
          },
          {
            "src": "img/apple-touch-icon-57x57.png",
            "sizes": "57x57",
            "type": "image/png"
          },
          {
            "src": "img/apple-touch-icon-60x60.png",
            "sizes": "60x60",
            "type": "image/png"
          },
          {
            "src": "img/apple-touch-icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "img/favicon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "img/apple-touch-icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "img/mstile-310x310.png",
            "sizes": "310x310",
            "type": "image/png"
          }
        ],
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
