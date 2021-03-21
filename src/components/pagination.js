import React from "react";
import { Link } from "gatsby";

function Pagination({ next, prev }) {
  return (
    <div className="pagination">
      <p>
        {prev.slug && (
          <Link className="prev" to={prev.slug}>
            {prev.title}
          </Link>
        )}
        {next.slug && (
          <Link className="next" to={next.slug}>
            {next.title}
          </Link>
        )}
      </p>
    </div>
  );
}

export default Pagination;
