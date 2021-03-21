import React from "react";
import { Link } from "gatsby";
const _ = require("lodash");

function TagList({ tags }) {
  return (
    <div className="tags">
      <h3>Tags</h3>
      {tags.map((t, idx) => (
        <Link key={`tag-${idx}`} to={`/tags/${_.kebabCase(t)}`}>
          <div className="tag">
            <span>{t}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TagList;
