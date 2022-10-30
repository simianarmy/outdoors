/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

const blogTemplate = path.resolve(`./src/templates/blog-post.js`);
const thruhikeTemplate = path.resolve(`./src/templates/thruhike.js`);
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
      component: `${blogTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
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

const createThruHikes = ({ thruhikes, createPage }) => {
  thruhikes.forEach(({ node }, index) => {
    const [prevNode, nextNode] = getPrevNextNodes(thruhikes, index);

    createPage({
      path: node.uid,
      component: thruhikeTemplate,
      context: {
        slug: node.uid,
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
        thruHikeId: node.data.thruhike.uid,
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
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);
  const allPrismic = await graphql(`
    query {
      allPrismicThruhike(
        sort: { fields: [data___start_date], order: DESC }
      ) {
        edges {
          node {
            uid
            data {
              nav_title
            }
          }
        }
      }
      allPrismicThruhikeSection(
        sort: { fields: [data___start_time], order: DESC }
      ) {
        edges {
          node {
            uid
            data {
              ending_location
              starting_location
              tags
              thruhike {
                uid
              }
            }
          }
        }
      }
    }
  `);
  const posts = allMdx.data.allMdx.edges;
  createBlogPosts({ posts, createPage });

  const thruhikes = allPrismic.data.allPrismicThruhike.edges;
  createThruHikes({ thruhikes, createPage });

  const hikes = allPrismic.data.allPrismicThruhikeSection.edges;
  createThruHikeSections({ hikes, createPage });

  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, (edge) => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  let thruTags = [];
  _.each(hikes, (edge) => {
    if (_.get(edge, "node.data.tags")) {
      thruTags = thruTags.concat(edge.node.data.tags.split(","));
    }
  });

  // Eliminate duplicate tags
  tags = _.uniq(tags.concat(thruTags).map(t => _.trim(t, ' "')));

  // Make tag pages
  tags.forEach((tag) => {
    //console.log("creating tag page", _.kebabCase(tag));
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
        regexTag: `/${tag}/`
      },
    });
  });
};
