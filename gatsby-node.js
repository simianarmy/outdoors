/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

const blogTemplate = path.resolve(`./src/templates/blog-post.js`);
const thruhikeSectionTemplate = path.resolve(
  `./src/templates/thruhike-section.js`
);
const tagTemplate = path.resolve(`./src/templates/tags.js`);

const getPrevNextNodes = (list, index) => {
  const prevNode = index === 0 ? null : list[index - 1].node;
  const nextNode = index === list.length - 1 ? null : list[index + 1].node;
  return [prevNode, nextNode];
};

const createBlogPosts = ({ posts, createPage }) => {
  posts.forEach(({ node }, index) => {
    const [prevNode, nextNode] = getPrevNextNodes(posts, index);

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
    });
  });
};

const createThruHikeSections = ({ hikes, createPage }) => {
  hikes.forEach(({ node }, index) => {
    const [prevNode, nextNode] = getPrevNextNodes(hikes, index);

    createPage({
      path: node.uid,
      component: thruhikeSectionTemplate,
      context: {
        slug: node.uid,
        prev: prevNode,
        next: nextNode,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `src/entries` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  /**
   * query both mdx and primic data
   */
  const allMdx = await graphql(`
    query {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
  `);
  const allPrismic = await graphql(`
    query {
      allPrismicThruhikeSection(
        sort: { fields: [data___start_time], order: DESC }
      ) {
        edges {
          node {
            uid
            data {
              tags
              title {
                text
              }
            }
          }
        }
      }
    }
  `);
  const posts = allMdx.data.allMdx.edges;
  createBlogPosts({ posts, createPage });

  const hikes = allPrismic.data.allPrismicThruhikeSection.edges;
  createThruHikeSections({ hikes, createPage });

  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, (edge) => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  _.each(hikes, (edge) => {
    if (_.get(edge, "node.data.tags")) {
      tags = tags.concat(edge.node.data.tags.split(","));
    }
  });

  // Eliminate duplicate tags
  tags = _.uniq(tags);

  // Make tag pages
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });
};
