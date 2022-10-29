import React from "react";
import { Link } from "gatsby";

function Pagination({ next, prev }) {
  return (
    <div className="flex justify-between">
      {prev.slug && (
        <Link className="prev hover:underline text-blue-600 text-sm" to={prev.slug}>
          {prev.title}
        </Link>
      )}
      {next.slug && (
        <Link className="hover:underline text-blue-600 text-sm" to={next.slug}>
          {next.title}
        </Link>
      )}
    </div>
  );
}

export default Pagination;
