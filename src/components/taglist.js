import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

function TagList({ tags }) {
  return (
    <div className="flex flex-wrap">
      {tags.map((t, idx) => (
        <Link
          className="mr-1 hover:underline"
          key={`tag-${idx}`}
          to={`/tags/${kebabCase(t)}`}
        >
          <span className="py-0 px-0.5 bg-zinc-100 rounded-sm text-sm text-blue-600">
            {t}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default TagList;
