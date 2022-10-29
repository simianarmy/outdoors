import React from "react";
import { Link } from "gatsby";

function Pagination({ next, prev }) {
  return (
    <div className="text-sm">
      <p>
        {prev.slug && (
          <Link className="prev hover:underline text-blue-600" to={prev.slug}>
            {prev.title}
          </Link>
        )}
        {next.slug && (
          <Link className="float-right hover:underline text-blue-600" to={next.slug}>
            {next.title}
          </Link>
        )}
      </p>
    </div>
  );
}

export default Pagination;
