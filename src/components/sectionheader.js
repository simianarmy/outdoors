import React from "react";

import SectionIcon from "../components/sectionicon";
import "./sectionheader.scss";

export default function SectionHeader({section, startDate, endDate}) {
  return (
    <div className="sectionHeader">
      <div className="titleRow">
        {section.location_icon?.url ? <SectionIcon url={section.location_icon.url} /> : null}
        <span className="locations">
          {section.starting_location} - {section.ending_location}
        </span>
      </div>
      <div className="dates">
        <span>
          {startDate} - {endDate}
        </span>
      </div>
    </div>
  );
}
