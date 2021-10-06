import React from "react";
import { Link } from "gatsby";

import { rhythm } from "../utils/typography";
import { displayMonthAndDay } from "../utils/dates";

import "./sectionhike.scss";

function SectionHike({uid, data}) {
  return (
    <section className="sectionHikeContainer" key={uid}>
      <Link
        to={`/${uid}`}
      >
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          {data.title.text}{" "}
        </h3>
      </Link>
      <div className="sectionLocation">
        <div className="locationHeader">
        {data.location_icon?.url ?
          (<div className="locationIcon">
            <img src={data.location_icon.url} alt="location" />
          </div>) : null
        }
        <div className="locationStartEnd">
          <span>
            {data.starting_location} - {data.ending_location}
          </span>
        </div>
        </div>
        <span className="dates">
          {displayMonthAndDay(data.start_time)} -{" "}
          {displayMonthAndDay(data.end_time)}
        </span>
      </div>
    </section>
  );
}

export default SectionHike;
