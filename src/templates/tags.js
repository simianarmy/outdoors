import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Link, graphql } from 'gatsby'
import sortBy from 'lodash/sortBy';

import Layout from '../components/layout'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount: mdxCount } = data.allMdx
  const { edges: thruEdges, totalCount: thruCount } = data.allPrismicThruhikeSection;
  const totalCount = mdxCount + thruCount;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  // normalize edges
  let allNodes = edges.map(({ node }) => ({
    title: node.frontmatter.title,
    slug: node.fields.slug
  }));
  allNodes = allNodes.concat(thruEdges.map(({ node }) => ({
    title: node.data.starting_location,
    slug: `/${node.uid}`
  })));

  return (
    <Layout>
      <h1>{tagHeader}</h1>
      <ul>
        {sortBy(allNodes, [(n) => n.title]).map(({ slug, title }) => (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
        ))}
      </ul>
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    regexTag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
    allPrismicThruhikeSection: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            data: PropTypes.shape({
            }),
          }),
        }),
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String, $regexTag: String) {
    allPrismicThruhikeSection(
      filter: { data: { tags: { regex: $regexTag } } }
    ) {
      totalCount
      edges {
        node {
          uid
          data {
            starting_location
            ending_location
          }
        }
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
