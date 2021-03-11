/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require('lodash')

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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges

  const blogTemplate = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve('src/templates/tags.js')

  // Make the blog post pages
  posts.forEach(({ node }, index) => {
    //console.log('creating page ', index, node.fields.slug);
    const prevNode = index === 0 ? null : posts[index - 1].node
    const nextNode = index === posts.length - 1 ? null : posts[index + 1].node

    createPage({
      path: node.fields.slug,
      component: blogTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        prev: prevNode,
        next: nextNode,
      },
    })
  })

  let tags = []
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.tags')) {
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
  })
}
