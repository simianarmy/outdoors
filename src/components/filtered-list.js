import React from 'react'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'

class FilteredList extends React.Component {
  render() {
    return this.props.items.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              {node.frontmatter.title}{' '}
              <span
                style={{
                  color: '#bbb',
                }}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
    ));
  }
}

export default FilteredList;

