import React from 'react'
import PropTypes from 'prop-types'

// Utilities
import kebabCase from 'lodash/kebabCase'

// Components
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout.js'
const _ = require("lodash");

const parseTagsFromString = (str) => str.split(',').map(t => _.toLower(_.trim(t, ' "')));

const TagsPage = ({
  data: {
    allMdx: { group },
    allPrismicThruhikeSection: { edges }
  },
}) => {
  // store mdx tags into map
  const tagCounts = group.reduce((acc, curr) => {
    acc[curr.fieldValue] = curr.totalCount;
    return acc;
  }, {});
  // count the tags from the prismic string data
  _.each(edges, curr => {
    const tags = parseTagsFromString(curr.node.data.tags);
    _.each(tags, t => {
      if (tagCounts[t]) {
        tagCounts[t] += 1;
      } else {
        tagCounts[t] = 1;
      }
    });
  });

  return (
  <Layout>
    <div>
      <h1>Tags</h1>
      <ul>
        {Object.keys(tagCounts).sort().map(tag => (
          <li key={tag}>
            <Link to={`/tags/${kebabCase(tag)}/`}>
              {tag} ({tagCounts[tag]})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
  );
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    allPrismicThruhikeSection: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            data: PropTypes.shape({
              tags: PropTypes.string.isRequired,
            }).isRequired
          }),
        }),
      )
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000, filter: {}) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
    allPrismicThruhikeSection(limit: 2000, filter: {}) {
      edges {
        node {
          data {
            tags
          }
        }
      }
    }
  }
`
