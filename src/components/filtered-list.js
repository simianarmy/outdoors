import React from 'react';
import { Link } from 'gatsby';

import { displayDate } from '../utils/dates';

function FilteredList({ items }) {
  return items.map(({ node }) => (
    <div key={node.id} className="mb-4">
      <Link to={node.fields.slug}>
        <h3 className="text-lg font-bold leading-snug">
          {node.frontmatter.title}
        </h3>
        <span className="text-slate-500 text-xs">
          {displayDate(new Date(node.frontmatter.date))}
        </span>
        <p className="text-sm">{node.excerpt}</p>
      </Link>
    </div>
  ));
}

export default FilteredList;
