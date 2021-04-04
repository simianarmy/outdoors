import React from 'react'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import { displayDate } from '../utils/dates'

import './filtered-list.scss'

function FilteredList({ items }) {
  return items.map(({ node }) => (
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
          {node.frontmatter.title} <br />
          <span className="date">
            {displayDate(new Date(node.frontmatter.date))}
          </span>
        </h3>
        <p>{node.excerpt}</p>
      </Link>
    </div>
  ))
}

export default FilteredList
