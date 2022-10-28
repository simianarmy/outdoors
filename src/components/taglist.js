import React from "react";
import { Link } from "gatsby";
import kebabCase from 'lodash/kebabCase'

function TagList({ tags }) {
  return (
    <div className="tags">
      <h3>Tags</h3>
      {tags.map((t, idx) => (
        <Link key={`tag-${idx}`} to={`/tags/${kebabCase(t)}`}>
          <div className="tag">
            <span>{t}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TagList;
