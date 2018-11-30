/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `src/entries` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
    ).then(result => {
      const posts = result.data.allMarkdownRemark.edges;

      const blogTemplate = path.resolve(`./src/templates/blog-post.js`);
      const tagTemplate = path.resolve("src/templates/tags.js")

      // Make the blog post pages
      posts.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: blogTemplate,
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });
      });

      let tags = []
      // Iterate through each post, putting all found tags into `tags`
      _.each(posts, edge => {
        if (_.get(edge, "node.frontmatter.tags")) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })
      // Eliminate duplicate tags
      tags = _.uniq(tags)

      // Make tag pages
      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}/`,
          component: tagTemplate,
          context: {
            tag,
          },
        })
      });

      resolve()
    })
  })
}
