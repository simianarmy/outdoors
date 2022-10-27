import React from "react";
import { Link } from "gatsby";

import SectionHeader from "./sectionheader";
import { displayMonthAndDay } from "../utils/dates";

import "./sectionhike.scss";

function SectionHike({uid, data}) {
  return (
    <section className="sectionHikeContainer" key={uid}>
      <Link
        to={`/${uid}`}
      >
        <SectionHeader section={data}
          startDate={displayMonthAndDay(data.start_time)}
          endDate={displayMonthAndDay(data.end_time)} />
      </Link>
    </section>
  );
}

export default SectionHike;
