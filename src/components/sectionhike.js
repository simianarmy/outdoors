import React from "react";
import { Link } from "gatsby";

import { rhythm } from "../utils/typography";
import { displayMonthAndDay } from "../utils/dates";

function SectionHike({uid, data}) {
  return (
    <section key={uid}>
      <Link
        to={`/${uid}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          {data.title.text}{" "}
        </h3>
      </Link>
      <div>
        <span
          style={{
            color: "#bbb",
          }}
        >
          {data.starting_location} - {data.ending_location}
          <br />
          {displayMonthAndDay(data.start_time)} -{" "}
          {displayMonthAndDay(data.end_time)}
        </span>
      </div>
    </section>
  );
}

export default SectionHike;
