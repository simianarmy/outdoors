import React from "react";
import { Link } from "gatsby";
import kebabCase from 'lodash/kebabCase'

function TagList({ tags }) {
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-lg">Tags</h3>
      {tags.map((t, idx) => (
        <Link className="hover:underline" key={`tag-${idx}`} to={`/tags/${kebabCase(t)}`}>
          <div className="mr-1.5 inline">
            <span className="py-0 px-0.5 bg-zinc-100 rounded-sm">{t}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TagList;
