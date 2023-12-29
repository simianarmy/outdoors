import React from 'react';
import PropTypes from 'prop-types';

// Utilities
import kebabCase from 'lodash/kebabCase';
import { each, trim } from 'lodash';

// Components
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout.js';

const parseTagsFromString = (str) => str.split(',').map((t) => trim(t, ' "'));

const TagsPage = ({
  data: {
    allMdx: { group },
    allPrismicThruhikeSection: { edges },
  },
}) => {
  // store mdx tags into map
  const tagCounts = group.reduce((acc, curr) => {
    acc[curr.fieldValue] = curr.totalCount;
    return acc;
  }, {});
  // count the tags from the prismic string data
  each(edges, (curr) => {
    const tags = parseTagsFromString(curr.node.data.tags);
    each(tags, (t) => {
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
        <h1 className="mt-8 mb-8 text-xl font-bold">All Tags</h1>
        <ul>
          {Object.keys(tagCounts)
            .sort()
            .map((tag) => (
              <li key={tag}>
                <Link
                  className="hover:underline"
                  to={`/tags/${kebabCase(tag)}/`}
                >
                  {tag} ({tagCounts[tag]})
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
};

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
            }).isRequired,
          }),
        })
      ),
    }),
  }),
};

export default TagsPage;

export const pageQuery = graphql`
  {
    allMdx(limit: 2000, filter: {}) {
      group(field: { frontmatter: { tags: SELECT } }) {
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
`;
